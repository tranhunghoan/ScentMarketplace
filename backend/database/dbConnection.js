var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testing", // Đổi tên thành db trên xampp
});
conn.connect((err) => {
  if (err) {
    console.log(err.code);
    console.log(err.fatal);
  }
});
query = "SELECT * FROM user";

conn.query(query, (err, results, fields) => {
  if (err) {
    console.log("An error occurred with query ");
  }
  console.log("Query successfully executed", results);
});
module.exports = conn;
