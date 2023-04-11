import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  database: "tailor_db",
  user: "root",
  password: "root",
});

export default connection;
