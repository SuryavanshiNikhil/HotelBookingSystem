import { useEffect, useState } from "react";
import API from "../../api";
import RoomCard from "../../components/RoomCard";
import BookingFormModal from "../../components/BookingFormModal";

export default function UserRooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState("");

  async function loadRooms() {
    const res = await API.get("/rooms/available");
    setRooms(res.data);
  }

  useEffect(() => {
    loadRooms();
  }, []);

  async function handleSubmitBooking(payload) {
    try {
      await API.post("/bookings", payload);
      setMessage("Booking request created with status Pending.");
      setSelectedRoom(null);
      loadRooms();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create booking");
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Available Rooms</h1>
      </div>
      {message && (
        <p className="text-sm text-slate-700 bg-slate-100 px-3 py-2 rounded-md">
          {message}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <RoomCard
            key={room._id}
            room={room}
            onBook={setSelectedRoom}
          />
        ))}
        {rooms.length === 0 && (
          <p className="text-sm text-slate-500">No rooms available.</p>
        )}
      </div>

      {selectedRoom && (
        <BookingFormModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSubmit={handleSubmitBooking}
        />
      )}
    </div>
  );
}
