import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Student Course API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Test query on startup
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("PostgreSQL Connected Successfully at:", res.rows[0].now);
  } catch (err) {
    console.error("PostgreSQL Connection Error:", err.message);
  }
});