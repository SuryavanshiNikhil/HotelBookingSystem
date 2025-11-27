import { useEffect, useState } from "react";
import API from "../../api";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await API.get("/admin/summary");
      setSummary(res.data);
    }
    load();
  }, []);

  if (!summary) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  const cards = [
    { label: "Total Rooms", value: summary.totalRooms },
    { label: "Booked Rooms", value: summary.bookedRooms },
    { label: "Available Rooms", value: summary.availableRooms },
    { label: "Pending Requests", value: summary.pendingRequests }
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-white hover:bg-teal-100 duration-700 shadow rounded-lg p-4">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
