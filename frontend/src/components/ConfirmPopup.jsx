// src/components/ConfirmPopup.jsx
import api from "../api";
import { useState } from "react";

const ConfirmPopup = ({ car, username, startDate, endDate, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  const totalPrice = car.rental_price * days;

  const handleConfirm = async () => {
    try {
      // 1. Add to rentals
      await api.post("/rentals/", {
        username,
        start_date: startDate,
        end_date: endDate,
        car_id: car.id,
      });

      // 2. Update car availability
      await api.put(`/cars/${car.id}`, {
        available: false,
      });

      setConfirmed(true);
    } catch (error) {
      console.error("Error renting car:", error);
      alert("Rental failed. Try again.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "30%",
        width: "40%",
        padding: "2rem",
        backgroundColor: "#fff",
        border: "2px solid #000",
        zIndex: 1000,
      }}
    >
      {!confirmed ? (
        <>
          <h3>Confirm Rental</h3>
          <p>Total Days: {days}</p>
          <p>Total Price: ₹{totalPrice}</p>
          <button onClick={handleConfirm}>Confirm</button>{" "}
          <button onClick={onClose}>Cancel</button>
        </>
      ) : (
        <>
          <h3>Car Rented Successfully!</h3>
          <p>
            {car.make} {car.model}
          </p>
          <p>Car ID: {car.id}</p>
          <p>From: {startDate}</p>
          <p>To: {endDate}</p>
          <button onClick={onClose}>Exit</button>
        </>
      )}
    </div>
  );
};

export default ConfirmPopup;
