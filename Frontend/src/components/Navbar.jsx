import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <nav className="bg-slate-300 shadow-sm rounded-xl px-4 py-3 flex items-center justify-between">
      {user && user.role === "admin" && (
        <Link  to="/admin/dashboard" className="font-semibold text-lg text-indigo-600">
          HotelBooking
        </Link>
      )}
      {user && user.role !== "admin" && (
        <Link   to="/user/dashboard" className="font-semibold text-lg text-indigo-600">
          HotelBooking
        </Link>
      )}
      {!user && (
        <Link  to="/" className="font-semibold text-lg text-indigo-600">
          HotelBooking
        </Link>
      )}

      <div className="flex items-center justify-evenly gap-20 ">
        {user && user.role === "admin" && (
          <>
            <Link
              to="/admin/dashboard"
              className="text-sm px-4 py-2  hover:bg-gray-400 active:scale-95 rounded-lg hover:text-black duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/rooms"
              className="text-sm px-4 py-2 hover:bg-gray-400 active:scale-95 rounded-lg hover:text-black duration-300"
            >
              Rooms
            </Link>
            <Link
              to="/admin/bookings"
              className="text-sm px-4 py-2 hover:bg-gray-400 active:scale-95 rounded-lg hover:text-black duration-300"
            >
              Bookings
            </Link>
          </>
        )}
        {user && user.role === "user" && (
          <>
            <Link
              to="/user/dashboard"
              className="text-sm px-4 py-2  hover:bg-gray-400 active:scale-95 rounded-lg hover:text-black duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/user/rooms"
              className="text-sm px-4 py-2  hover:bg-gray-400 active:scale-95 rounded-lg hover:text-black duration-300"
            >
              Rooms
            </Link>
            <Link
              to="/user/bookings"
              className="text-sm px-4 py-2  hover:bg-gray-400 active:scale-95 rounded-lg hover:text-black duration-300"
            >
              My Bookings
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="text-sm hover:text-indigo-600">
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-3 py-1 rounded-full bg-indigo-600 text-white"
            >
              Sign up
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-sm text-slate-600 hidden sm:inline">
              {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 rounded-full bg-red-400 hover:bg-red-600 active:scale-95 duration-200 text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
