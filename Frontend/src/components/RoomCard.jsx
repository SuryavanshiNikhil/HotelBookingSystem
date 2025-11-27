import { motion } from "framer-motion";
import { FaBed } from "react-icons/fa";

export default function RoomCard({ room, onBook }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-5"
    >
      <h2 className="text-xl font-bold text-black flex items-center gap-2">
        <FaBed className="text-secondary" /> Room {room.roomNumber}
      </h2>

      <p className="text-black/80 text-sm mt-1">{room.description}</p>

      <p className="text-accent font-bold mt-2 text-lg">₹{room.pricePerNight}</p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onBook(room)}
        className="mt-4 w-full bg-secondary p-3 rounded-xl text-white"
      >
        Book Now
      </motion.button>
    </motion.div>
  );
}
