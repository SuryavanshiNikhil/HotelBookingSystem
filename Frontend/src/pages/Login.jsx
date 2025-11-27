import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, setLoading } = useAuth();
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);
      login(res.data);
      

      if (res.data.user.role === "admin") {
        localStorage.setItem("userName", res.data.name);
        nav("/welcome");
      } else {
        localStorage.setItem("userName", res.data.name);
        nav("/welcome");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>
        {error && <p className="text-sm text-red-600 mb-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 active:scale-95 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-center mt-3">
          No account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
