const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,        // correct MySQL port
  user: "root",
  password: "1234",  // replace with your actual root password
  database: "opencourt"
});

// Connect to MySQL, but don’t block server startup
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

// Basic test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});
