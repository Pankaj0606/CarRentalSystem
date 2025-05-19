import React, { useState } from 'react';
import api from '../api'; // your axios or fetch wrapper

const CancelRental = ({ onClose, onCancelSuccess }) => {
  const [rentalId, setRentalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (!rentalId.trim()) {
      setError('Please enter a Rental ID');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await api.delete(`/rentals/${rentalId.trim()}`);
      onCancelSuccess();
    } catch (err) {
      setError('Failed to cancel rental. Please check the Rental ID and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Cancel a Rent</h2>
        <label>
          Rental ID:
          <input
            type="text"
            value={rentalId}
            onChange={(e) => setRentalId(e.target.value)}
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleConfirm} disabled={loading}>
          {loading ? 'Cancelling...' : 'Confirm Cancel'}
        </button>
        <button onClick={onClose} disabled={loading}>
          Close
        </button>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        label {
          display: block;
          margin-bottom: 10px;
        }
        input {
          width: 100%;
          padding: 6px;
          margin-top: 4px;
        }
        button {
          margin-right: 10px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default CancelRental;
