import pool from "../config/db.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await pool.query("SELECT * FROM courses ORDER BY created_at DESC");
    res.json(courses.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses." });
  }
};

export const createCourse = async (req, res) => {
  const { title, description, instructor } = req.body;

  try {
    const newCourse = await pool.query(
      "INSERT INTO courses (title, description, instructor) VALUES ($1, $2, $3) RETURNING *",
      [title, description, instructor]
    );
    res.status(201).json(newCourse.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course." });
  }
};