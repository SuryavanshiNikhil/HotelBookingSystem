import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  type: { type: String, enum: ["Single", "Double", "Suite"], required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String, default: "" },
  isBooked: { type: Boolean, default: false }
});

export default mongoose.model("Room", roomSchema);
