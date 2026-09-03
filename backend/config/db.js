import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // RDS uses a cert chain that Node doesn't trust by default
  },
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database (RDS)");
});

pool.on("error", (err) => {
  console.error("Unexpected database error:", err);
});

export default pool;