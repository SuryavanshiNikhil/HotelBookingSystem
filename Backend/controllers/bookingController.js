import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import { sendPaymentReceiptEmail } from "../utils/email.js";

// POST /api/bookings
export async function createBooking(req, res) {
  try {
    const { roomId, checkInDate, checkOutDate, numberOfGuests } = req.body;

    if (!roomId || !checkInDate || !checkOutDate || !numberOfGuests) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    if (isNaN(inDate) || isNaN(outDate) || inDate >= outDate) {
      return res
        .status(400)
        .json({ message: "Check-out must be after check-in" });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Do not auto set isBooked here. Only when admin approves.
    const booking = await Booking.create({
      user: req.user.id,
      room: roomId,
      checkInDate: inDate,
      checkOutDate: outDate,
      numberOfGuests,
      status: "Pending"
    });

    return res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /api/bookings/my
export async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("room")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (err) {
    console.error("Get my bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function payForBooking(req, res) {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("room")
      .populate("user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (booking.status !== "Approved") {
      return res.status(400).json({ message: "Booking must be approved first" });
    }

    // Simulated payment success
    booking.status = "Paid";
    await booking.save();

    booking.room.isBooked = true;
    await booking.room.save();

    return res.json({ message: "Payment successful and room booked", booking });
  } catch (err) {
    console.error("Payment Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
