# CarRentalSystem/database/setup_db.py

import sqlite3
import os

# Get path to current directory (database/)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Put car_rental.db inside database/ folder
DB_PATH = os.path.join(BASE_DIR, "car_rental.db")
SCHEMA_PATH = os.path.join(BASE_DIR, "schema.sql")
SEED_PATH = os.path.join(BASE_DIR, "seed_data.sql")

def initialize_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    with open(SCHEMA_PATH, "r") as f:
        cur.executescript(f.read())
        print("✅ Tables created successfully.")

    with open(SEED_PATH, "r") as f:
        cur.executescript(f.read())
        print("✅ Sample data inserted successfully.")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    initialize_db()

# # CarRentalSystem/database/setup_db.py

# import sqlite3

# def initialize_db():
#     conn = sqlite3.connect("car_rental.db")  # SQLite DB file
#     cur = conn.cursor()

#     # Read and execute schema
#     with open("schema.sql", "r") as f:
#         cur.executescript(f.read())
#         print("✅ Tables created successfully.")

#     # Read and execute seed data
#     with open("seed_data.sql", "r") as f:
#         cur.executescript(f.read())
#         print("✅ Sample data inserted successfully.")

#     conn.commit()
#     conn.close()

# if __name__ == "__main__":
#     initialize_db()

