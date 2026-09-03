import pool from "../config/db.js";




// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Course
export const createCourse = async (req, res) => {
  const { title, instructor, category, level, duration, description } = req.body;
  const document_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      `INSERT INTO courses (title, instructor, category, level, duration, description, document_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, instructor, category, level, duration, description, document_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, category, level, duration, description } = req.body;

  try {
    let query = `
      UPDATE courses 
      SET title = $1, category = $2, level = $3, duration = $4, description = $5
    `;
    const values = [title, category, level, duration, description];

    if (req.file) {
      query += `, document_url = $6 WHERE id = $7 RETURNING *`;
      values.push(`/uploads/${req.file.filename}`, id);
    } else {
      query += ` WHERE id = $6 RETURNING *`;
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};