import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createBooking,
  getMyBookings,
  payForBooking
} from "../controllers/bookingController.js";

const router = express.Router();

router.use(auth);

router.post("/", createBooking);
router.get("/my", getMyBookings);

// user payment route 👇
// router.patch("/:id/pay", payForBooking);
router.patch("/:id/pay", auth, payForBooking);


export default router;
