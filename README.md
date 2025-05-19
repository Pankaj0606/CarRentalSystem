# Car Rental System Documentation
## Project Overview
This document provides comprehensive information about the Car Rental System, a RESTful API built with FastAPI for managing car rentals. The system allows users to browse available cars, rent them for specified dates, and cancel existing rentals. It includes robust API validation using Pydantic models and comprehensive test coverage using `pytest`.
**Key Features:**
*   Browse available cars with details like make, model, year, and daily rate.
*   Rent a car for a specified period.
*   Cancel existing rentals.
*   API validation using Pydantic models for request and response data.
*   Comprehensive test coverage using `pytest`.
**Supported Platforms/Requirements:**
*   Python 3.11+
## Getting Started
### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Pankaj0606/CarRentalSystem.git
    cd CarRentalSystem
    ```
    
2.  **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # macOS/Linux
    # .venv\Scripts\activate  # Windows PowerShell
    ```
    
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    
### Dependencies
*   FastAPI
*   Uvicorn
*   Pydantic
*   SQLite
*   Alembic
*   pytest
*   httpx
## Code Structure
```
CarRentalSystem/
├── backend/
│   ├── main.py               # FastAPI app entry point
│   └── ...                   # Other backend modules
├── database/
│   ├── schema.sql            # Database schema definition
│   ├── seed_data.sql         # Initial data to populate the database
│   └── setup_db.py           # Database setup and migration scripts
├── frontend/
│   └── src/
│   ├── App.jsx               # Main React application entry point
│   └── components/
│   ├── CarList.jsx           # Component to list cars
│   ├── CancelRental.jsx      # Component to cancel a rental
│   ├── ConfirmPopup.jsx      # Confirmation popup component
│   └── RentCarForm.jsx       # Form component to rent a car
├── test_main.py              # Test cases
├── test_sdk.py               # SDK Test Cases
├── car_rental_sdk/           # SDK Package
├── alembic/                  # DB Migration scripts
├── venv/                     # Python virtual environment
├── requirements.txt          # Project dependencies
├── setup.sh                  # Development Setup Script
├── run.sh                    # Execution Script
└── README.md                 # This file
```
**Key Components:**
*   **`backend/main.py`**:  This file contains the FastAPI application, including API endpoints and database interaction logic.
*   **`database/schema.sql`**: Defines the database schema for cars and rentals.
*   **`database/seed_data.sql`**: Contains initial data to populate the database.
*   **`database/setup_db.py`**:  Sets up the database, creates tables, and seeds data.
*   **`car_rental_sdk/`**: Contains the generated Python SDK for interacting with the API.
*   **`alembic/`**: Contains database migration scripts.
*   **`test_main.py`**: Contains tests for the main backend API.
*   **`test_sdk.py`**: Contains tests for the generated SDK.
## API Documentation
All API endpoints are defined in `backend/main.py`.
### Endpoints
#### 1. Add a Car (POST `/cars/`)
*   **Description:** Adds a new car to the database.
*   **Input:**
    ```json
    {
      "make": "Toyota",
      "model": "Corolla",
      "year": 2022,
      "daily_rate": 50.0,
      "available": true
    }
    ```
    
*   **Output:**
    ```json
    {
      "id": 1,
      "make": "Toyota",
      "model": "Corolla",
      "year": 2022,
      "daily_rate": 50.0,
      "available": true
    }
    ```
    
*   **Example Request:**
    ```python
    import requests
    import json
    url = "http://localhost:8000/cars/"
    headers = {"Content-Type": "application/json"}
    data = {
        "id": 61,
        "make": "Honda",
        "model": "Civic",
        "year": 2021,
        "daily_rate": 40.0,
        "available": true
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(response.json())
    ```
    <img width="477" alt="Screenshot 2025-05-19 at 6 36 04 AM" src="https://github.com/user-attachments/assets/e478f7f3-c449-4536-9ba8-5e5c8d04771a" />
    <img width="545" alt="Screenshot 2025-05-19 at 6 37 04 AM" src="https://github.com/user-attachments/assets/e62d4260-e750-4d4c-8610-7d2d78720df3" />
    
 #### 2. Get All Cars (GET `/cars/`)
*   **Description:** Retrieves a list of all cars in the database.
*   **Input:** None
*   **Output:**
    ```json
    [
      {
        "id": 1,
        "make": "Toyota",
        "model": "Corolla",
        "year": 2022,
        "daily_rate": 50.0,
        "available": true
      },
      {
        "id": 2,
        "make": "Honda",
        "model": "Civic",
        "year": 2021,
        "daily_rate": 40.0,
        "available": true
      }
    ]
    ```
*   **Example Request:**
    ```python
    import requests
    url = "http://localhost:8000/cars/"
    response = requests.get(url)
    print(response.json())
    ```
<img width="390" alt="Screenshot 2025-05-19 at 6 39 47 AM" src="https://github.com/user-attachments/assets/7e056f0a-5081-4b9f-8192-a557a2778879" />
<img width="415" alt="Screenshot 2025-05-19 at 6 40 14 AM" src="https://github.com/user-attachments/assets/3dc84c6e-61ee-4d8d-b4df-877ec61022a6" />
    
#### 3. Get Car by ID (GET `/cars/{car_id}`)
*   **Description:** Retrieves a specific car by its ID.
*   **Input:** `car_id` (integer)
*   **Output:**
    ```json
    {
      "id": 61,
      "make": "Honda",
      "model": "Civic",
      "year": 2021,
      "daily_rate": 40,
      "available": true
    }
    ```
*   **Example Request:**
    ```python
    import requests
    car_id = 61
    url = f"http://localhost:8000/cars/{car_id}"
    response = requests.get(url)
    print(response.json())
    ```
<img width="577" alt="Screenshot 2025-05-19 at 6 41 18 AM" src="https://github.com/user-attachments/assets/804b9f63-41ce-4465-a49e-813074d1a0bc" />
<img width="415" alt="Screenshot 2025-05-19 at 6 41 38 AM" src="https://github.com/user-attachments/assets/f19bea12-e5c7-408c-9c3d-c03ef60f35ff" />
    
#### 4. Rent a Car (POST `/cars/{car_id}/rent`)
*   **Description:** Rents a car for a specified period.
*   **Input:**
    ```json
    {
      "user_name": "Pankaj",
      "start_date": "2025-05-19",
      "end_date": "2025-05-22"
    }
    ```
*   **Output:**
    ```json
    {
      "id": 64,
      "car_id": 61,
      "user_name": "Pankaj",
      "start_date": "2025-05-19",
      "end_date": "2025-05-22"
    }
    ```
*   **Example Request:**
    ```python
    import requests
    import json
    car_id = 61
    url = f"http://localhost:8000/cars/{car_id}/rent"
    headers = {"Content-Type": "application/json"}
    data = {
        "user_name": "Pankaj",
        "start_date": "2025-05-19",
        "end_date": "2025-05-22"
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(response.json())
    ```
<img width="528" alt="Screenshot 2025-05-19 at 6 42 48 AM" src="https://github.com/user-attachments/assets/1f412c8e-9576-4e0e-9810-8cb558881195" />
<img width="523" alt="Screenshot 2025-05-19 at 6 43 10 AM" src="https://github.com/user-attachments/assets/464f928d-b83a-44f6-8461-46ebcc46d0e4" />
    
#### 5. Cancel Rental (DELETE `/rentals/{rental_id}`)
*   **Description:** Cancels an existing rental.
*   **Input:** `rental_id` (integer)
*   **Output:**
    ```json
    {
      "detail": "Rental cancelled successfully"
    }
    ```
*   **Example Request:**
    ```python
    import requests
    rental_id = 61
    url = f"http://localhost:8000/rentals/{rental_id}"
    response = requests.delete(url)
    print(response.json())
    ```
<img width="545" alt="Screenshot 2025-05-19 at 6 43 57 AM" src="https://github.com/user-attachments/assets/ebb41434-ae9a-400e-86e9-ce0e9fd31b97" />
<img width="526" alt="Screenshot 2025-05-19 at 6 44 17 AM" src="https://github.com/user-attachments/assets/5ad526be-82f7-4414-949e-f9147006724f" />

## License
MIT License © 2025 Pankaj Kumar Yadav
