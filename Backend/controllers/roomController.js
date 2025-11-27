import Room from "../models/Room.js";

// GET /api/rooms/available
export async function getAvailableRooms(req, res) {
  try {
    const rooms = await Room.find({ isBooked: false });
    return res.json(rooms);
  } catch (err) {
    console.error("Get available rooms error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
