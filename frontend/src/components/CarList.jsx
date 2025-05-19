import { useState, useEffect } from "react";
import api from "../api";
import RentCarForm from "./RentCarForm";
import "./CarList.css"; // Assumes you have modal and layout CSS here

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [error, setError] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);
  const [showRentForm, setShowRentForm] = useState(true);

  const [rentalId, setRentalId] = useState("");
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [cancelConfirmed, setCancelConfirmed] = useState(false);

  const [showCancelForm, setShowCancelForm] = useState(false);
  const [rentalSuccessData, setRentalSuccessData] = useState(null);

  // Fetch available cars on mount
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoadingCars(true);
    setError("");
    try {
      const response = await api.get("/cars/");
      setCars(response.data.filter((car) => car.available));
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load cars. Please try again later.");
    } finally {
      setLoadingCars(false);
    }
  };

  // Show rent modal for selected car
  const handleRentClick = (car) => {
    setSelectedCar(car);
    setCancelConfirmed(false);
    setError("");
  };

  // Submit rent request
  const handleRentSubmit = async ({ user_name, startDate, endDate }) => {
    if (!selectedCar) return;

    try {
      const response = await api.post(`/cars/${selectedCar.id}/rent`, {
        user_name,
        start_date: startDate,
        end_date: endDate,
      });

      // Assuming response.data contains rental id
      setRentalSuccessData({
        rentalId: response.data.id || selectedCar.id,
        car: selectedCar,
      });

      setSelectedCar(null);
      fetchCars();
    } catch (err) {
      console.error("Error creating rental:", err.response?.data || err.message);
      alert("Failed to rent the car. Please try again.");
    }
  };

  // Cancel rent form cancel
  const handleRentCancel = () => {
    setSelectedCar(null);
  };

  // Handle rental cancellation submit (just delete by rental ID)
  const handleCancelSubmit = async () => {
    if (!rentalId.trim()) {
      alert("Please enter a valid Rental ID.");
      return;
    }

    setLoadingCancel(true);
    setError("");
    setCancelConfirmed(false);

    try {
      // Directly delete rental record by rentalId
      await api.delete(`/rentals/${rentalId.trim()}`);

      // Refetch cars to update availability
      fetchCars();

      setCancelConfirmed(true);
      setRentalId("");
      setShowCancelForm(false);
      setShowRentForm(true);
    } catch (err) {
      alert("Invalid Rental ID or error cancelling rental.");
      console.error("Error cancelling rental:", err);
      setError("Invalid Rental ID or error cancelling rental.");
    } finally {
      setLoadingCancel(false);
    }
  };

  return (
    <div
      className="carlist-container"
      style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}
    >
      {/* Navigation Buttons */}
<div
  className="nav-buttons-container"
>
  <button
    id="rent-car-btn"
    className={`nav-button ${showRentForm ? "active" : ""}`}
    onClick={() => {
      setShowRentForm(true);
      setShowCancelForm(false);
      setCancelConfirmed(false);
      setRentalId("");
      setError("");
      setSelectedCar(null);
    }}
    disabled={showRentForm}
    aria-pressed={showRentForm}
    aria-label="Switch to Rent a Car form"
  >
    Rent a Car
  </button>
  <button
    id="cancel-rent-btn"
    className={`nav-button ${showCancelForm ? "active" : ""}`}
    onClick={() => {
      setShowCancelForm(true);
      setShowRentForm(false);
      setSelectedCar(null);
      setCancelConfirmed(false);
      setRentalId("");
      setError("");
    }}
    disabled={showCancelForm}
    aria-pressed={showCancelForm}
    aria-label="Switch to Cancel a Rent form"
  >
    Cancel a Rent
  </button>
</div>


      {/* Error Message */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }} role="alert">
          {error}
        </p>
      )}

      {/* Rent Car List */}
      {showRentForm && (
        <>
          <h2>Available Cars</h2>
          {loadingCars ? (
            <p>Loading cars...</p>
          ) : cars.length === 0 ? (
            <p>No cars available for rent at the moment.</p>
          ) : (
            <div className="car-grid">
              {cars.map((car) => (
                <div key={car.id} className="car-card">
                  <h3>
                    {car.make} {car.model}
                  </h3>
                  <p>Year: {car.year}</p>
                  <p>Color: {car.color}</p>
                  <p>Rent: ₹{car.daily_rate} /day</p>
                  <button onClick={() => handleRentClick(car)}>Rent Car</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Cancel Rent Form */}
      {showCancelForm && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancelFormTitle"
        >
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowCancelForm(false)}
              aria-label="Close Cancel Form"
            >
              ✖
            </button>
            <h3 id="cancelFormTitle">Cancel a Rental</h3>
            <input
              type="text"
              placeholder="Enter Rental ID"
              value={rentalId}
              onChange={(e) => setRentalId(e.target.value)}
              style={{ marginRight: "1rem", padding: "0.5rem", width: "200px" }}
              disabled={loadingCancel}
              aria-label="Rental ID input"
              autoFocus
            />
            <button onClick={handleCancelSubmit} disabled={loadingCancel}>
              {loadingCancel ? "Cancelling..." : "Confirm Cancellation"}
            </button>
          </div>
        </div>
      )}

      {/* Rent Form Modal */}
      {selectedCar && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rentFormTitle"
        >
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={handleRentCancel}
              aria-label="Close Rent Form"
            >
              ✖
            </button>
            <RentCarForm
              car={selectedCar}
              onSubmit={handleRentSubmit}
              onCancel={handleRentCancel}
            />
          </div>
        </div>
      )}

      {/* Success Message after cancellation */}
      {/* With this modal popup:*/}
{cancelConfirmed && (
  <div
    className="modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="cancelSuccessTitle"
  >
    <div className="modal-content">
      <h3 id="cancelSuccessTitle">Rental Cancelled Successfully!</h3>
      <button
        onClick={() => setCancelConfirmed(false)}
        style={{ marginTop: "1rem" }}
      >
        Okay
      </button>
    </div>
  </div>
)}

      {/* Rent Success Modal */}
      {rentalSuccessData && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rentSuccessTitle"
        >
          <div className="modal-content">
            <h3 id="rentSuccessTitle">Rent Successful!</h3>
            <p>
              <strong>Car:</strong> {rentalSuccessData.car.make}{" "}
              {rentalSuccessData.car.model}
            </p>
            <p>
              <strong>Rental ID:</strong> {rentalSuccessData.rentalId}
            </p>
            <button
              onClick={() => setRentalSuccessData(null)}
              style={{ marginTop: "1rem" }}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;


// import { useState, useEffect } from "react";
// import api from "../api";
// import RentCarForm from "./RentCarForm";
// import "./CarList.css"; // Assumes you have modal and layout CSS here

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [loadingCars, setLoadingCars] = useState(false);
//   const [error, setError] = useState("");

//   const [selectedCar, setSelectedCar] = useState(null);
//   const [showRentForm, setShowRentForm] = useState(true);

//   const [rentalId, setRentalId] = useState("");
//   const [rentalDetails, setRentalDetails] = useState(null);
//   const [cancelConfirmed, setCancelConfirmed] = useState(false);
//   const [loadingCancel, setLoadingCancel] = useState(false);

//   const [showCancelForm, setShowCancelForm] = useState(false);
//   const [rentalSuccessData, setRentalSuccessData] = useState(null);

//   // Fetch available cars on mount
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     setLoadingCars(true);
//     setError("");
//     try {
//       const response = await api.get("/cars/");
//       setCars(response.data.filter((car) => car.available));
//     } catch (err) {
//       console.error("Error fetching cars:", err);
//       setError("Failed to load cars. Please try again later.");
//     } finally {
//       setLoadingCars(false);
//     }
//   };

//   // Show rent modal for selected car
//   const handleRentClick = (car) => {
//     setSelectedCar(car);
//     setCancelConfirmed(false);
//     setError("");
//   };

//   // Submit rent request
//   const handleRentSubmit = async ({ user_name, startDate, endDate }) => {
//     if (!selectedCar) return;

//     try {
//       const response = await api.post(`/cars/${selectedCar.id}/rent`, {
//         user_name,
//         start_date: startDate,
//         end_date: endDate,
//       });

//       // Assuming response.data contains rental id
//       setRentalSuccessData({
//         rentalId: response.data.id || selectedCar.id,
//         car: selectedCar,
//       });

//       setSelectedCar(null);
//       fetchCars();
//     } catch (err) {
//       console.error("Error creating rental:", err.response?.data || err.message);
//       alert("Failed to rent the car. Please try again.");
//     }
//   };

//   // Cancel rent form cancel
//   const handleRentCancel = () => {
//     setSelectedCar(null);
//   };

//   // Handle rental cancellation submit (enter rental id)
//   const handleCancelSubmit = async () => {
//     if (!rentalId.trim()) {
//       alert("Please enter a valid Rental ID.");
//       return;
//     }

//     setLoadingCancel(true);
//     setRentalDetails(null);
//     setError("");
//     setCancelConfirmed(false);

//     try {
//       // Fetch rental details by rentalId
//       const rentalRes = await api.get(`/rentals/${rentalId.trim()}`);
//       const rental = rentalRes.data;

//       if (!rental.start_date) {
//         throw new Error("Invalid start date in rental data");
//       }

//       // Fetch car details for rental
//       const carRes = await api.get(`/cars/${rental.car_id}`);
//       const car = carRes.data;

//       if (typeof car.daily_rate !== "number") {
//         throw new Error("Invalid daily rate in car data");
//       }

//       const startDate = new Date(rental.start_date);
//       if (isNaN(startDate)) {
//         throw new Error("Start date is not a valid date");
//       }

//       const cancelDate = new Date();
//       const diffTime = cancelDate.getTime() - startDate.getTime();
//       const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

//       const totalCost = diffDays * Number(car.daily_rate);

//       setRentalDetails({
//         ...car,
//         start_date: rental.start_date.split("T")[0],
//         cancel_date: cancelDate.toISOString().split("T")[0],
//         total_cost: totalCost,
//         rental_id: rental.id,
//       });      
//     } catch (err) {
//       alert("Invalid Rental ID or Error fetching rental.");
//       console.error(err);
//       setError("Invalid Rental ID or Error fetching rental.");
//       setRentalDetails(null);
//     } finally {
//       setLoadingCancel(false);
//     }
//   };

//   // Confirm cancellation - release car and delete rental
//   const confirmCancel = async () => {
//     if (!rentalDetails) return;
  
//     setLoadingCancel(true);
//     setError("");
//     try {
//       // Just delete rental record
//       await api.delete(`/rentals/${rentalDetails.rental_id}`);
  
//       // Refetch cars to get updated availability
//       fetchCars();
  
//       setRentalDetails(null);
//       setRentalId("");
//       setCancelConfirmed(true);
//       setShowCancelForm(false);
//       setShowRentForm(true);
//     } catch (err) {
//       alert("Error cancelling rent. Please try again.");
//       console.error("Error cancelling rent:", err);
//       setError("Error cancelling rent. Please try again.");
//     } finally {
//       setLoadingCancel(false);
//     }
//   };
  

//   return (
//     <div
//       className="carlist-container"
//       style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}
//     >
//       {/* Navigation Buttons */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "1rem",
//           marginBottom: "1rem",
//         }}
//       >
//         <button
//           onClick={() => {
//             setShowRentForm(true);
//             setShowCancelForm(false);
//             setRentalDetails(null);
//             setCancelConfirmed(false);
//             setRentalId("");
//             setError("");
//             setSelectedCar(null);
//           }}
//           disabled={showRentForm}
//           aria-pressed={showRentForm}
//           aria-label="Switch to Rent a Car form"
//         >
//           Rent a Car
//         </button>
//         <button
//           onClick={() => {
//             setShowCancelForm(true);
//             setShowRentForm(false);
//             setSelectedCar(null);
//             setCancelConfirmed(false);
//             setRentalId("");
//             setRentalDetails(null);
//             setError("");
//           }}
//           disabled={showCancelForm}
//           aria-pressed={showCancelForm}
//           aria-label="Switch to Cancel a Rent form"
//         >
//           Cancel a Rent
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <p style={{ color: "red", textAlign: "center" }} role="alert">
//           {error}
//         </p>
//       )}

//       {/* Rent Car List */}
//       {showRentForm && (
//         <>
//           <h2>Available Cars</h2>
//           {loadingCars ? (
//             <p>Loading cars...</p>
//           ) : cars.length === 0 ? (
//             <p>No cars available for rent at the moment.</p>
//           ) : (
//             <div className="car-grid">
//               {cars.map((car) => (
//                 <div key={car.id} className="car-card">
//                   <h3>
//                     {car.make} {car.model}
//                   </h3>
//                   <p>Year: {car.year}</p>
//                   <p>Color: {car.color}</p>
//                   <p>Rent: ₹{car.daily_rate} /day</p>
//                   <button onClick={() => handleRentClick(car)}>Rent Car</button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {/* Cancel Rent Form */}
//       {showCancelForm && (
//         <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cancelFormTitle">
//           <div className="modal-content">
//             <button
//               className="close-btn"
//               onClick={() => setShowCancelForm(false)}
//               aria-label="Close Cancel Form"
//             >
//               ✖
//             </button>
//             <h3 id="cancelFormTitle">Cancel a Rental</h3>
//             <input
//               type="text"
//               placeholder="Enter Rental ID"
//               value={rentalId}
//               onChange={(e) => setRentalId(e.target.value)}
//               style={{ marginRight: "1rem", padding: "0.5rem", width: "200px" }}
//               disabled={loadingCancel}
//               aria-label="Rental ID input"
//               autoFocus
//             />
//             <button onClick={handleCancelSubmit} disabled={loadingCancel}>
//               {loadingCancel ? "Checking..." : "Confirm"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Rent Form Modal */}
//       {selectedCar && (
//         <div
//           className="modal-overlay"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="rentFormTitle"
//         >
//           <div className="modal-content">
//             <button
//               className="close-btn"
//               onClick={handleRentCancel}
//               aria-label="Close Rent Form"
//             >
//               ✖
//             </button>
//             <RentCarForm
//               car={selectedCar}
//               onSubmit={handleRentSubmit}
//               onCancel={handleRentCancel}
//             />
//           </div>
//         </div>
//       )}

//       {/* Cancel Confirmation Modal */}
//       {rentalDetails && (
//         <div
//           className="modal-overlay"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="cancelConfirmTitle"
//         >
//           <div className="modal-content">
//             <h3 id="cancelConfirmTitle">Cancel Confirmation</h3>
//             <p>
//               <strong>Rental ID:</strong> {rentalDetails.rental_id}
//             </p>
//             <p>
//               <strong>Car:</strong> {rentalDetails.make} {rentalDetails.model}
//             </p>
//             <p>
//               <strong>Start Date:</strong> {rentalDetails.start_date}
//             </p>
//             <p>
//               <strong>Cancel Date:</strong> {rentalDetails.cancel_date}
//             </p>
//             <p>
//               <strong>Daily Rate:</strong> ₹{rentalDetails.daily_rate}
//             </p>
//             <p>
//               <strong>Total Cost:</strong> ₹{rentalDetails.total_cost}
//             </p>
//             <button onClick={confirmCancel} disabled={loadingCancel}>
//               {loadingCancel ? "Cancelling..." : "Confirm Cancellation"}
//             </button>
//             <button
//               onClick={() => setRentalDetails(null)}
//               disabled={loadingCancel}
//               style={{ marginLeft: "1rem" }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Success Message after cancellation */}
//       {cancelConfirmed && (
//         <p
//           style={{ color: "green", textAlign: "center", marginTop: "1rem" }}
//           role="alert"
//         >
//           Rental cancelled successfully.
//         </p>
//       )}

//       {/* Rent Success Modal */}
//       {rentalSuccessData && (
//         <div
//           className="modal-overlay"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="rentSuccessTitle"
//         >
//           <div className="modal-content">
//             <h3 id="rentSuccessTitle">Rent Successful!</h3>
//             <p>
//               <strong>Car:</strong> {rentalSuccessData.car.make}{" "}
//               {rentalSuccessData.car.model}
//             </p>
//             <p>
//               <strong>Rental ID:</strong> {rentalSuccessData.rentalId}
//             </p>
//             <button
//               onClick={() => setRentalSuccessData(null)}
//               style={{ marginTop: "1rem" }}
//             >
//               Okay
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarList;
