import { useEffect, useState } from "react";
import API from "../../api";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await API.get("/bookings/my");
    setBookings(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handlePay(id) {
    try {
      setMessage("");
      const res = await API.patch(`/bookings/${id}/pay`);
      setMessage(res.data.message || "Payment successful.");
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Payment failed.");
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">My Booking Requests</h1>

      {message && (
        <p className="text-sm bg-slate-100 text-slate-800 px-3 py-2 rounded-md">
          {message}
        </p>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        {bookings.length === 0 && (
          <p className="text-sm text-slate-500">You do not have any bookings.</p>
        )}

        <div className="space-y-3">
          {bookings.map(b => (
            <div
              key={b._id}
              className="border rounded-md px-3 py-2 flex flex-col gap-1 text-sm"
            >
              <p className="font-semibold">
                Room {b.room?.roomNumber} - {b.room?.type}
              </p>
              <p className="text-xs text-slate-600">
                Check-in: {new Date(b.checkInDate).toDateString()} | Check-out:{" "}
                {new Date(b.checkOutDate).toDateString()} | Guests:{" "}
                {b.numberOfGuests}
              </p>
              <p className="text-xs">
                Status:{" "}
                <span
                  className={
                    b.status === "Paid"
                      ? "text-green-600"
                      : b.status === "Approved"
                      ? "text-blue-600"
                      : b.status === "Rejected"
                      ? "text-red-600"
                      : "text-amber-600"
                  }
                >
                  {b.status}
                </span>
              </p>

              {/* Show Pay button only when Approved but not Paid */}
              {b.status === "Approved" && (
                <button
                  onClick={() => handlePay(b._id)}
                  className="mt-1 self-start px-3 py-1 rounded-md text-xs bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Pay & Confirm Booking
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
