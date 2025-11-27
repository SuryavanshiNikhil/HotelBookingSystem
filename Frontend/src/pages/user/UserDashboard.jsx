import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    }
    load();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">
        Welcome, {user?.name}
      </h1>
      <p className="text-sm text-slate-600">
        Here are your recent booking requests.
      </p>

      <div className="bg-white rounded-lg shadow p-4">
        {bookings.length === 0 && (
          <p className="text-sm text-slate-500">
            You do not have any bookings yet.
          </p>
        )}
        <div className="space-y-3">
          {bookings.map(b => (
            <div
              key={b._id}
              className="border  rounded-md px-3 py-2 flex flex-col gap-1 text-sm"
            >
              <p className="font-semibold">
                Room {b.room?.roomNumber} - {b.room?.type} - ₹
                {b.room?.pricePerNight} / night
              </p>
              <p className="text-xs text-slate-600">
                Check-in: {new Date(b.checkInDate).toDateString()} | Check-out:{" "}
                {new Date(b.checkOutDate).toDateString()}
              </p>
              <p className="text-xs">
                Status:{" "}
                <span
                  className={
                    b.status === "Approved"
                      ? "text-green-600"
                      : b.status === "Rejected"
                      ? "text-red-600"
                      : "text-amber-600"
                  }
                >
                  {b.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
