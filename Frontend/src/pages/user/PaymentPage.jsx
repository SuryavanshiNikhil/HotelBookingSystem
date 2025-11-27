import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import API from "../../api";
import { motion } from "framer-motion";
import { FaCreditCard } from "react-icons/fa";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      const res = await API.get("/bookings/my");
      const found = res.data.find((b) => b._id === id);
      setBooking(found);
    }
    load();
  }, []);

  async function handlePay() {
    try {
      await API.patch(`/bookings/${id}/pay`);
      setMsg("Payment Successful!");
      setTimeout(() => navigate("/user/bookings"), 1200);
    } catch (err) {
      setMsg("Payment failed.");
    }
  }

  if (!booking) return <p>Loading...</p>;

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-500 via-pink-500 to-cyan-400">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-glass"
        >
          <h1 className="text-white text-3xl font-bold flex items-center gap-2 mb-4">
            <FaCreditCard className="text-yellow-300" />
            Payment Gateway
          </h1>

          <p className="text-white/90">
            <strong>Room:</strong> {booking.room.roomNumber} ({booking.room.type})
          </p>
          <p className="text-white/90">
            <strong>Amount:</strong> ₹{booking.room.pricePerNight}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="w-full mt-6 p-3 bg-green-500 text-white rounded-xl shadow-neo font-bold"
            onClick={handlePay}
          >
            Pay Now
          </motion.button>

          {msg && <p className="text-center text-white mt-3">{msg}</p>}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
