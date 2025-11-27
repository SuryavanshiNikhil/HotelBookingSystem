import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { sendBookingStatusEmail, sendPaymentReceiptEmail } from "../utils/email.js"; 

// GET /api/admin/summary
export async function getSummary(req, res) {
  try {
    const totalRooms = await Room.countDocuments();
    const bookedRooms = await Room.countDocuments({ isBooked: true });
    const availableRooms = await Room.countDocuments({ isBooked: false });
    const pendingRequests = await Booking.countDocuments({ status: "Pending" });

    return res.json({
      totalRooms,
      bookedRooms,
      availableRooms,
      pendingRequests
    });
  } catch (err) {
    console.error("Summary error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /api/admin/rooms
export async function createRoom(req, res) {
  try {
    const { roomNumber, type, pricePerNight, description } = req.body;
    if (!roomNumber || !type || !pricePerNight) {
      return res
        .status(400)
        .json({ message: "Room number, type, price are required" });
    }

    const room = await Room.create({
      roomNumber,
      type,
      pricePerNight,
      description
    });

    return res.status(201).json(room);
  } catch (err) {
    console.error("Create room error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /api/admin/rooms
export async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find();
    return res.json(rooms);
  } catch (err) {
    console.error("Get rooms error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /api/admin/bookings?status=pending|approved|rejected
export async function getBookingsByStatus(req, res) {
  try {
    const status = req.query.status || "Pending";
    const bookings = await Booking.find({ status: { $regex: new RegExp(`^${status}`, "i") } })
      .populate("user", "name email")
      .populate("room");

    return res.json(bookings);
  } catch (err) {
    console.error("Get bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// PATCH /api/admin/bookings/:id/approve
export async function approveBooking(req, res) {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("room")
      .populate("user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only move to "Approved", DO NOT book room yet
    booking.status = "Approved";
    await booking.save();

    // Email: "Approved, please complete payment"
    await sendBookingStatusEmail(
      booking.user.email,
      "Approved",
      booking.room,
      {
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate
      }
    );

    return res.json({ message: "Booking approved (awaiting payment)", booking });
  } catch (err) {
    console.error("Approve booking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// PATCH /api/admin/bookings/:id/reject
export async function rejectBooking(req, res) {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("room").populate("user");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Rejected";
    await booking.save();

    await sendBookingStatusEmail(
      booking.user.email,
      "Rejected",
      booking.room,
      {
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate
      }
    );

    return res.json({ message: "Booking rejected", booking });
  } catch (err) {
    console.error("Reject booking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

//Remove Booking
export async function removeRoomBooking(req, res) {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Make room available again
    room.isBooked = false;
    await room.save();

    // Update booking status → "Cancelled"
    const booking = await Booking.findOne({ room: roomId, status: "Paid" });
    if (booking) {
      booking.status = "Cancelled";
      await booking.save();
    }

    return res.json({
      message: "Room is now available again",
      room,
    });
  } catch (err) {
    console.error("Remove booking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

