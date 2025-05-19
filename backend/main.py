from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel, Field
from typing import List, Optional
import sqlite3
from datetime import date
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Car Rental System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only — allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "database", "car_rental.db")
DB_PATH = os.path.abspath(DB_PATH)

# Pydantic models
class Car(BaseModel):
    id: Optional[int] = None  # This allows POST input without ID
    make: str
    model: str
    year: int
    daily_rate: float
    available: bool 

class RentalRequest(BaseModel):
    user_name: str
    start_date: date
    end_date: date

class Rental(BaseModel):
    id: Optional[int]
    car_id: int
    user_name: str
    start_date: date
    end_date: date

# DB helpers
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def add_car(car: Car) -> int:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO cars (make, model, year, daily_rate, available) VALUES (?, ?, ?, ?, ?)",
        (car.make, car.model, car.year, car.daily_rate, car.available)
    )
    conn.commit()
    car_id = cur.lastrowid
    conn.close()
    return car_id

def get_all_cars() -> List[Car]:
    conn = get_db_connection()
    cars = conn.execute("SELECT * FROM cars").fetchall()
    conn.close()
    return [Car(**dict(car)) for car in cars]

def get_car(car_id: int) -> Optional[Car]:
    conn = get_db_connection()
    car = conn.execute("SELECT * FROM cars WHERE id=?", (car_id,)).fetchone()
    conn.close()
    return Car(**dict(car)) if car else None

def is_car_available(car_id: int, start_date: date, end_date: date) -> bool:
    conn = get_db_connection()
    query = """
        SELECT COUNT(*) FROM rentals
        WHERE car_id = ?
          AND NOT (end_date < ? OR start_date > ?)
    """
    # Overlapping logic:
    # Rental overlaps if NOT (existing rental ends before start_date OR starts after end_date)
    cur = conn.cursor()
    cur.execute(query, (car_id, start_date, end_date))
    (count,) = cur.fetchone()
    conn.close()
    return count == 0

def create_rental(car_id: int, rental: RentalRequest) -> int:
    conn = get_db_connection()
    cur = conn.cursor()

    # Insert rental
    cur.execute(
        "INSERT INTO rentals (car_id, user_name, start_date, end_date) VALUES (?, ?, ?, ?)",
        (car_id, rental.user_name, rental.start_date.isoformat(), rental.end_date.isoformat())
    )

    # Update availability to false
    cur.execute("UPDATE cars SET available = 0 WHERE id = ?", (car_id,))

    conn.commit()
    rental_id = cur.lastrowid
    conn.close()
    return rental_id


# def delete_rental(rental_id: int) -> bool:
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute("DELETE FROM rentals WHERE id = ?", (rental_id,))
#     conn.commit()
#     deleted = cur.rowcount > 0
#     conn.close()
#     return deleted
def delete_rental(rental_id: int) -> bool:
    conn = get_db_connection()
    cur = conn.cursor()

    # Get the car_id before deletion
    cur.execute("SELECT car_id FROM rentals WHERE id = ?", (rental_id,))
    row = cur.fetchone()
    if not row:
        conn.close()
        return False
    car_id = row["car_id"]

    # Delete rental
    cur.execute("DELETE FROM rentals WHERE id = ?", (rental_id,))

    # Mark car as available
    cur.execute("UPDATE cars SET available = 1 WHERE id = ?", (car_id,))

    conn.commit()
    deleted = cur.rowcount > 0
    conn.close()
    return deleted


def get_rental(rental_id: int) -> Optional[Rental]:
    conn = get_db_connection()
    rental = conn.execute("SELECT * FROM rentals WHERE id=?", (rental_id,)).fetchone()
    conn.close()
    return Rental(**dict(rental)) if rental else None

# API Endpoints
@app.post("/cars/", response_model=Car)
def api_add_car(car: Car):
    car_id = add_car(car)
    car.id = car_id
    return car

@app.get("/cars/", response_model=List[Car])
def api_get_cars():
    return get_all_cars()

@app.get("/cars/{car_id}", response_model=Car)
def api_get_car(car_id: int = Path(..., gt=0)):
    car = get_car(car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

# @app.post("/cars/{car_id}/rent", response_model=Rental)
# def api_rent_car(car_id: int, rental: RentalRequest):
#     car = get_car(car_id)
#     if not car:
#         raise HTTPException(status_code=404, detail="Car not found")

#     if rental.start_date > rental.end_date:
#         raise HTTPException(status_code=400, detail="start_date must be before or equal to end_date")

#     available = is_car_available(car_id, rental.start_date, rental.end_date)
#     if not available:
#         raise HTTPException(status_code=400, detail="Car is not available for the requested period")

#     rental_id = create_rental(car_id, rental)
#     return Rental(id=rental_id, car_id=car_id, **rental.dict())
@app.post("/cars/{car_id}/rent", response_model=Rental)
def api_rent_car(car_id: int, rental: RentalRequest):
    car = get_car(car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    if car.available == 0:
        raise HTTPException(status_code=400, detail="This car is currently not available")

    if rental.start_date > rental.end_date:
        raise HTTPException(status_code=400, detail="start_date must be before or equal to end_date")

    if not is_car_available(car_id, rental.start_date, rental.end_date):
        raise HTTPException(status_code=400, detail="Car is not available for the requested period")

    rental_id = create_rental(car_id, rental)
    return Rental(id=rental_id, car_id=car_id, **rental.model_dump())


@app.delete("/rentals/{rental_id}")
def api_cancel_rental(rental_id: int):
    rental = get_rental(rental_id)
    if not rental:
        raise HTTPException(status_code=404, detail="Rental not found")
    deleted = delete_rental(rental_id)
    if not deleted:
        raise HTTPException(status_code=500, detail="Failed to delete rental")
    return {"detail": "Rental cancelled successfully"}
