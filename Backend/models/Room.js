import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  type: String,
  pricePerNight: Number,
  description: String,
  isBooked: { type: Boolean, default: false },
  image: { type: String, default: "" }   // NEW FIELD
});

export default mongoose.model("Room", roomSchema);
