````markdown
# Car Rental System API

A RESTful API built with FastAPI for managing car rentals. This project includes features for browsing cars, renting, and canceling rentals, along with comprehensive tests.

---

## Features

- Browse available cars
- Rent a car for specified dates
- Cancel rentals
- Robust API with validation using Pydantic models
- Test coverage using `pytest`

---

## Technology Stack

- Python 3.11+
- FastAPI
- Uvicorn (ASGI server)
- Pydantic
- HTTPX (for async HTTP client/testing)
- Pytest (for testing)

---

## Getting Started

### Prerequisites

- Python 3.11 or newer installed
- Git (optional, for cloning the repo)

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Pankaj0606/CarRentalSystem.git
cd CarRentalSystem
````

2. **Create and activate a virtual environment**

```bash
python3 -m venv venv
source venv/bin/activate    # macOS/Linux
# .\venv\Scripts\activate   # Windows PowerShell
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

---

## Running the Application

Start the FastAPI server using Uvicorn:

```bash
uvicorn backend.main:app --reload
```

* The API will be accessible at: `http://127.0.0.1:8000`
* API docs automatically generated at: `http://127.0.0.1:8000/docs`

---

## Running Tests

Run all tests with:

```bash
pytest
```

or

```bash
python -m pytest
```

**Note:** Make sure your virtual environment is activated before running tests.

---

## Project Structure

```
CarRentalSystem/
├── backend/
│   ├── main.py            # FastAPI app entry point
│   └── ...                # Other backend modules
|--
├── tests/
│   └── test_main.py       # Test cases
├── venv/                  # Python virtual environment
├── requirements.txt       # Project dependencies
└── README.md              # This file
```
CarRentalSystem/
├── backend/
│ ├── main.py               # FastAPI app entry point
│ └── ...                   # Other backend modules
├── database/
│ ├── schema.sql            # Database schema definition
│ ├── seed_data.sql         # Initial data to populate the database
│ └── setup_db.py           # Database setup and migration scripts
├── frontend/
│ └── src/
│ ├──── App.jsx             # Main React application entry point
│ └──── components/
│ ├────── CarList.jsx       # Component to list cars
│ ├────── CancelRental.jsx  # Component to cancel a rental
│ ├────── ConfirmPopup.jsx  # Confirmation popup component
│ └────── RentCarForm.jsx   # Form component to rent a car
├── test_main.py            # Test cases
├── test_sdk.py             # SDK Test Cases
├── car_rental_sdk/         # SDK Package
├── alembic/                # DB Migration scripts
├── venv/                   # Python virtual environment
├── requirements.txt        # Project dependencies
├── setup.sh                # Development Setup Script
├── run.sh                  # Execution Script
└── README.md               # This file
---

## Notes

* The project uses Pydantic v2. Make sure to update your code according to the [Pydantic v2 migration guide](https://errors.pydantic.dev/2.11/migration/).
* If you see warnings related to `.dict()`, replace it with `.model_dump()` in your Pydantic models.

---

## Troubleshooting

* If you encounter `ModuleNotFoundError` for `fastapi` or other packages, ensure you have activated the correct virtual environment where dependencies are installed.
* Use `which python` and `pip list` to confirm the environment and installed packages.

---

## License

MIT License © 2025 Pankaj Kumar Yadav

---
