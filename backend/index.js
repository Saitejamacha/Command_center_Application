require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Saiteja@368",
  database: process.env.DB_NAME || "alfred_command_center",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/projects", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/projects/:id/sites", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM project_sites WHERE project_id = ?",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/projects/:id/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE project_id = ? ORDER BY priority DESC, due_date ASC",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/projects/:id/updates", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM updates WHERE project_id = ? ORDER BY created_at DESC",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/projects/:id/risks", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM risks WHERE project_id = ? ORDER BY priority DESC",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { status, progress } = req.body;
    await pool.query("UPDATE tasks SET status = ?, progress = ? WHERE id = ?", [
      status,
      progress,
      req.params.id,
    ]);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/risks/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query("UPDATE risks SET status = ? WHERE id = ?", [
      status,
      req.params.id,
    ]);
    res.json({ message: "Risk updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/updates", async (req, res) => {
  try {
    const { project_id, title, message, type } = req.body;
    const [result] = await pool.query(
      "INSERT INTO updates (project_id, title, message, type) VALUES (?, ?, ?, ?)",
      [project_id, title, message, type]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL Database!");
    connection.release();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
