const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',     // or your MySQL host
  user: 'root',          // your MySQL username
  password: 'password',  // your MySQL password
  database: 'testdb'     // the database to connect to
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Express + MySQL!');
});

// Example route to fetch data from a table
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});