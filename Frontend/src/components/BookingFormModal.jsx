import { useState } from "react";

export default function BookingFormModal({ room, onClose, onSubmit }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      setError("Please select both dates");
      return;
    }
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError("Check-out must be after check-in");
      return;
    }
    setError("");
    onSubmit({ roomId: room._id, checkInDate, checkOutDate, numberOfGuests });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
        <h2 className="text-lg font-semibold mb-3">
          Book room {room.roomNumber} - {room.type}
        </h2>
        {error && (
          <p className="text-sm text-red-600 mb-2">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Check-in Date</label>
            <input
              type="date"
              className="w-full border rounded-md px-2 py-1 text-sm"
              value={checkInDate}
              onChange={e => setCheckInDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Check-out Date</label>
            <input
              type="date"
              className="w-full border rounded-md px-2 py-1 text-sm"
              value={checkOutDate}
              onChange={e => setCheckOutDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Number of Guests</label>
            <input
              type="number"
              min="1"
              className="w-full border rounded-md px-2 py-1 text-sm"
              value={numberOfGuests}
              onChange={e => setNumberOfGuests(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-md text-sm border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Submit request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
