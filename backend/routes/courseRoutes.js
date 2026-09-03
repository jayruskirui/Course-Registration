import express from "express";
import { getCourses, createCourse } from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, getCourses);
router.post("/", authenticateUser, createCourse);

export default router;