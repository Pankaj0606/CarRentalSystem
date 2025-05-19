from fastapi.testclient import TestClient
from backend.main import app
from datetime import date

client = TestClient(app)

def test_add_get_car():
    # Add a car
    new_car = {
        "make": "Toyota",
        "model": "Corolla",
        "year": 2022,
        "daily_rate": 50.0,
        "available": True
    }
    response = client.post("/cars/", json=new_car)
    assert response.status_code == 200
    data = response.json()
    assert data["make"] == new_car["make"]
    assert data["id"] is not None
    car_id = data["id"]

    # Get the car by id
    response = client.get(f"/cars/{car_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["model"] == new_car["model"]

def test_get_cars():
    response = client.get("/cars/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_rent_car_and_cancel():
    # Add a car first
    new_car = {
        "make": "Honda",
        "model": "Civic",
        "year": 2021,
        "daily_rate": 40.0,
        "available": True
    }
    response = client.post("/cars/", json=new_car)
    car_id = response.json()["id"]

    # Rent the car
    rental_data = {
        "user_name": "John Doe",
        "start_date": "2025-06-01",
        "end_date": "2025-06-05"
    }
    response = client.post(f"/cars/{car_id}/rent", json=rental_data)
    assert response.status_code == 200
    rental = response.json()
    assert rental["car_id"] == car_id
    rental_id = rental["id"]

    # Cancel rental
    response = client.delete(f"/rentals/{rental_id}")
    assert response.status_code == 200
    assert response.json()["detail"] == "Rental cancelled successfully"

def test_rent_car_unavailable_dates():
    # Add a car
    new_car = {
        "make": "Ford",
        "model": "Focus",
        "year": 2020,
        "daily_rate": 35.0,
        "available": True
    }
    response = client.post("/cars/", json=new_car)
    car_id = response.json()["id"]

    # Rent the car for some dates
    rental_data = {
        "user_name": "Alice",
        "start_date": "2025-07-01",
        "end_date": "2025-07-05"
    }
    response = client.post(f"/cars/{car_id}/rent", json=rental_data)
    assert response.status_code == 200

    # Try renting the same car overlapping the dates
    rental_data_overlap = {
        "user_name": "Bob",
        "start_date": "2025-07-04",
        "end_date": "2025-07-10"
    }
    response = client.post(f"/cars/{car_id}/rent", json=rental_data_overlap)
    assert response.status_code == 400
    assert "not available" in response.json()["detail"]

def test_rent_car_invalid_dates():
    # Add a car
    new_car = {
        "make": "Nissan",
        "model": "Sentra",
        "year": 2019,
        "daily_rate": 30.0,
        "available": True
    }
    response = client.post("/cars/", json=new_car)
    car_id = response.json()["id"]

    # Rent with start_date after end_date
    rental_data = {
        "user_name": "Charlie",
        "start_date": "2025-08-10",
        "end_date": "2025-08-05"
    }
    response = client.post(f"/cars/{car_id}/rent", json=rental_data)
    assert response.status_code == 400
    assert "start_date must be before or equal to end_date" in response.json()["detail"]
