import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Define uploads directory path
const uploadDir = path.join(process.cwd(), "uploads");

// Automatically create the folder if missing
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

router.get("/", getCourses);
router.post("/", authenticateUser, upload.single("document"), createCourse);
router.put("/:id", authenticateUser, upload.single("document"), updateCourse);
router.delete("/:id", authenticateUser, deleteCourse);

export default router;