import { useState } from "react";
import "./RentCarForm.css";

const RentCarForm = ({ car, onSubmit, onCancel }) => {
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!car) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }
    onSubmit({ user_name: username, startDate, endDate });
  };

  return (
    <div className="rent-form-container">
      <h3>Rent {car.make} {car.model}</h3>
      <form className="rent-form" onSubmit={handleSubmit}>
        <label>Your Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default RentCarForm;
