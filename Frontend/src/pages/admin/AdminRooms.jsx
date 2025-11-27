import { useEffect, useState } from "react";
import API from "../../api";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    type: "Single",
    pricePerNight: "",
    description: "",
  });
  const [error, setError] = useState("");

  async function loadRooms() {
    const res = await API.get("/admin/rooms");
    setRooms(res.data);
  }

  useEffect(() => {
    loadRooms();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await API.post("/admin/rooms", {
        ...form,
        pricePerNight: Number(form.pricePerNight),
      });
      setForm({
        roomNumber: "",
        type: "Single",
        pricePerNight: "",
        description: "",
      });
      loadRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add room");
    }
  }

  async function handleRemoveBooking(roomId) {
    try {
      await API.patch(`/admin/rooms/${roomId}/remove-booking`);
      alert("Room booking removed. Room is now available.");
      loadRooms();
    } catch (err) {
      alert("Failed to remove booking.");
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold mb-2">Manage Rooms</h1>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Add new room</h2>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <div>
            <label className="block text-sm mb-1">Room number</label>
            <input
              className="w-full border rounded-md px-2 py-1 text-sm"
              value={form.roomNumber}
              onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select
              className="w-full border rounded-md px-2 py-1 text-sm"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Single</option>
              <option>Double</option>
              <option>Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Price per night</label>
            <input
              type="number"
              className="w-full border rounded-md px-2 py-1 text-sm"
              value={form.pricePerNight}
              onChange={(e) =>
                setForm({ ...form, pricePerNight: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              className="w-full border rounded-md px-2 py-1 text-sm"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              Add room
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">All rooms</h2>
        <div className="grid gap-3">
          {rooms.map((room) => (
            // <div
            //   key={room._id}
            //   className="border  hover:bg-yellow-50 duration-700 rounded-md px-3 py-2 flex justify-between items-center text-sm"
            // >
            //   <div>
            //     <p className="font-semibold">
            //       Room {room.roomNumber} - {room.type}
            //     </p>
            //     <p className="text-xs text-slate-500">
            //       ₹{room.pricePerNight} / night
            //     </p>
            //   </div>
            //   <span
            //     className={
            //       "text-xs px-2 py-1 rounded-full " +
            //       (room.isBooked
            //         ? "bg-red-100 text-red-700"
            //         : "bg-green-100 text-green-700")
            //     }
            //   >
            //     {room.isBooked ? "Booked" : "Available"}
            //   </span>
            // </div>

            <div
              key={room._id}
              className="border hover:bg-yellow-50 duration-700 rounded-md px-3 py-2 flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-semibold">
                  Room {room.roomNumber} - {room.type}
                </p>
                <p className="text-xs text-slate-500">
                  ₹{room.pricePerNight} / night
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={
                    "text-xs px-2 py-1 rounded-full " +
                    (room.isBooked
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700")
                  }
                >
                  {room.isBooked ? "Booked" : "Available"}
                </span>

                {/* 🔥 Show remove button only if room is Booked */}
                {room.isBooked && (
                  <button
                    onClick={() => handleRemoveBooking(room._id)}
                    className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove Booking
                  </button>
                )}
              </div>
            </div>
          ))}
          {rooms.length === 0 && (
            <p className="text-sm text-slate-500">No rooms yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
