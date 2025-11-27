import { motion } from "framer-motion";
import { FaBed } from "react-icons/fa";

export default function RoomCard({ room, onBook }) {

  // If backend returned an image, show it
  const imageUrl = room.image
    ? `http://localhost:5000${room.image}`
    : "https://via.placeholder.com/500x300?text=No+Image";

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-5"
    >
      {/* Room Image */}
      <motion.img
        src={imageUrl}
        alt="Room"
        className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />

      {/* Room Title */}
      <h2 className="text-xl font-bold text-black flex items-center gap-2">
        <FaBed className="text-secondary" /> Room {room.roomNumber}
      </h2>

      {/* Description */}
      <p className="text-black/80 text-sm mt-1">{room.description}</p>

      {/* Price */}
      <p className="text-accent font-bold mt-2 text-lg">
        ₹{room.pricePerNight} / night
      </p>

      {/* Book Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onBook(room)}
        className="mt-4 w-full bg-secondary p-3 rounded-xl text-white font-semibold"
      >
        Book Now
      </motion.button>
    </motion.div>
  );
}
