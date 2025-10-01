import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '147.182.229.133',
  user: 'root',          
  password: 'blue123',   
  database: 'openCourt',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
