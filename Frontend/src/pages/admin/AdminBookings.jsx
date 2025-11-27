import { useEffect, useState } from "react";
import API from "../../api";

const tabs = [
  { key: "Pending", label: "Pending Requests" },
  { key: "Approved", label: "Approved" },
  { key: "Rejected", label: "Rejected" }
];

export default function AdminBookings() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [bookings, setBookings] = useState([]);

  async function loadBookings(status) {
    const res = await API.get(`/admin/bookings?status=${status.toLowerCase()}`);
    setBookings(res.data);
  }

  useEffect(() => {
    loadBookings(activeTab);
  }, [activeTab]);

  async function handleAction(id, action) {
    const endpoint =
      action === "approve"
        ? `/admin/bookings/${id}/approve`
        : `/admin/bookings/${id}/reject`;

    await API.patch(endpoint);
    loadBookings(activeTab);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Manage Bookings</h1>

      <div className="flex gap-2 border-b">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={
              "px-3 py-1 text-sm " +
              (activeTab === t.key
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-slate-600")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white  rounded-lg shadow p-4">
        {bookings.length === 0 && (
          <p className="text-sm text-slate-500">No bookings found.</p>
        )}
        <div className="space-y-3 ">
          {bookings.map(b => (
            <div
              key={b._id}
              className="border rounded-md px-3 py-2  hover:bg-teal-100 duration-700 flex flex-col gap-1 text-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {b.user?.name} ({b.user?.email})
                  </p>
                  <p className="text-xs text-slate-500">
                    Booking status: {b.status}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>Created: {new Date(b.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p>
                Room {b.room?.roomNumber} - {b.room?.type} - ₹
                {b.room?.pricePerNight} / night
              </p>
              <p className="text-xs text-slate-600">
                Check-in: {new Date(b.checkInDate).toDateString()} | Check-out:{" "}
                {new Date(b.checkOutDate).toDateString()} | Guests:{" "}
                {b.numberOfGuests}
              </p>

              {b.status === "Pending" && (
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleAction(b._id, "approve")}
                    className="px-3 py-1 rounded-md text-xs bg-green-600 text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(b._id, "reject")}
                    className="px-3 py-1 rounded-md text-xs bg-red-600 text-white"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
