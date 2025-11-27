import multer from "multer";
import path from "path";
import fs from "fs";

// Build absolute uploads path
const __dirname = path.resolve();
const uploadPath = path.join(__dirname, "Backend", "uploads");

// Create folder IF missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 uploads folder created at:", uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });
