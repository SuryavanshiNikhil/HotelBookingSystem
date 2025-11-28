// createAdmin.js
import mongoose from "mongoose";
import User from "./models/User.js"; // adjust path if needed
import bcrypt from "bcrypt";

// MongoDB connection
async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/hotel_booking");
  console.log("🌿 MongoDB connected");
}

async function createAdmin() {
  try {
    await connectDB();

    const name = "Jenil";
    const email = "admin@hotel.com";
    const password = "admin@123";
    const role = "admin";

    // check if admin already exists
    const exists = await User.findOne({ email });
    if (exists) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    console.log("🎉 Admin created:", admin);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createAdmin();
