import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import {
  getSummary,
  createRoom,
  getAllRooms,
  getBookingsByStatus,
  approveBooking,
  rejectBooking,
  removeRoomBooking
} from "../controllers/adminController.js";

const router = express.Router();

router.use(auth, isAdmin);

router.get("/summary", getSummary);
router.post("/rooms", createRoom);
router.get("/rooms", getAllRooms);

router.get("/bookings", getBookingsByStatus);
router.patch("/bookings/:id/approve", approveBooking);
router.patch("/bookings/:id/reject", rejectBooking);
router.patch("/rooms/:roomId/remove-booking", isAdmin, removeRoomBooking);


export default router;
