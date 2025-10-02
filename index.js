const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: "165.232.141.1",   
  port: 3306,
  user: "web_user",    
  password: "1234",    
  database: "opencourt"
});


// Try to connect to MySQL, but don’t block server startup
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("Connected to MySQL!");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//GRANT ALL PRIVILEGES ON *.* TO 'opencourt_user'@'%' WITH GRANT OPTION;
//mysql -u root -p
