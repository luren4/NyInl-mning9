const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 6969;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inlämning 8",
});

con.connect((err) => {
  if (err) {
    throw err;
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("hej");

app.post("/upload", (req, res) => {
  let sql = `INSERT INTO guestbook (name, email, homepage, comment) 
  VALUES ('${req.body.name}', '${req.body.email}', '${req.body.homepage}', '${req.body.comment}')`;
  console.log("funkar??");
  con.query(sql, function (err, result) {
    if (err) throw err;

    console.log("inserted");
    res.redirect("/allaPosts");
  });
});

app.get("/allaPosts", (req, res) => {
  console.log("kör /allaposts!");
  const sql = "SELECT * FROM guestbook ORDER BY id DESC";
  con.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
