require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,     
  port: process.env.DB_PORT,    
  user: process.env.DB_USER,     
  password: process.env.DB_PASS,
  database: process.env.DB_NAME 
});

// Connect to MySQL 
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed.", err.message);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the OpenCourt API!");
});

// --- ROUTES ---

// Get all events
app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: "Database fetch failed" });
    }
    res.json(results);
  });
});

// Create a new event
app.post("/events", (req, res) => {
  const { sport, eventLocation } = req.body;

  if (!sport || !eventLocation) {
    return res.status(400).json({ error: "Missing sport or location" });
  }

  const sql = "INSERT INTO events (sport, eventLocation) VALUES (?, ?)";
  db.query(sql, [sport, eventLocation], (err, result) => {
    if (err) {
      console.error("Error inserting event:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    const getSql = "SELECT * FROM events WHERE id = ?";
    db.query(getSql, [result.insertId], (err2, rows) => {
      if (err2) {
        console.error("Error fetching new event:", err2);
        return res.status(500).json({ error: "Database fetch failed" });
      }
      console.log("Inserted Event ID:", result.insertId);
      res.status(201).json(rows[0]); // return inserted event
    });
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
