from car_rental_sdk.openapi_client.api.default_api import DefaultApi
from car_rental_sdk.openapi_client.configuration import Configuration
from car_rental_sdk.openapi_client.api_client import ApiClient
from car_rental_sdk.openapi_client.models.car import Car
from car_rental_sdk.openapi_client.models.rental_request import RentalRequest

# Configure the SDK
config = Configuration(host="http://localhost:8000")

with ApiClient(config) as api_client:
    api = DefaultApi(api_client)

    # 1. POST /cars/ - Add a car
    print("\n✅ Adding a new car...")
    new_car = Car(
        make="TestBrand",
        model="TestModel",
        year=2025,
        daily_rate=45.00,
        available=True
    )
    created_car = api.api_add_car_cars_post(car=new_car)
    print("Created:", created_car)

    car_id = created_car.id

    # 2. GET /cars/ - Get all cars
    print("\n🚗 Fetching all cars...")
    all_cars = api.api_get_cars_cars_get()
    print(f"Total cars: {len(all_cars)}")
    assert any(car.id == car_id for car in all_cars), "New car not found in list!"

    # 3. GET /cars/{car_id} - Get single car
    print(f"\n🔍 Fetching car with ID {car_id}...")
    car = api.api_get_car_cars_car_id_get(car_id=car_id)
    print("Car by ID:", car)

    # 4. POST /cars/{car_id}/rent - Rent the car
    print(f"\n📦 Renting car with ID {car_id}...")
    rental_request = RentalRequest(
    user_name="John Doe",
    start_date="2025-05-21",
    end_date="2025-05-25",
    # any other required fields
)

    rental = api.api_rent_car_cars_car_id_rent_post(car_id=car_id, rental_request=rental_request.model_dump())
    print("Rental info:", rental)
    rent_id = rental.id

    # 5. DELETE /rentals/{rent_id} - Cancel the rental
    print(f"\n❌ Cancelling rental with ID {rent_id}...")
    api.api_cancel_rental_rentals_rental_id_delete(rental_id=rent_id)
    print("Rental cancelled.")

    print("\n✅ All tests passed.")
