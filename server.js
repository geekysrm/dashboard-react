const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL connection
var db_config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
};

var connection;

// Handle Disconnection of server
function handleDisconnect() {
  console.log("1. connecting to db:");
  connection = mysql.createConnection(db_config); 

  connection.connect(function(err) {
    if (err) {
      console.log("2. error when connecting to db:", err);
      setTimeout(handleDisconnect, 1000); 
    }
  }); 
  connection.on("error", function(err) {
    console.log("3. db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      
      handleDisconnect(); 
    } else {
      throw err; 
    }
  });
}

handleDisconnect();

// Login for user
app.post("/api/channels/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // make date
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  const date = new Date();
  const month = months[date.getMonth()];
  const today = `${date.getDate()}${month}${date.getFullYear()}`;
  console.log(today);

  if (username === "admin" && password === today) {
    const payload = { username }; // Create JWT Payload
    const secretOrKey = process.env.JWT_SECRET;
    // Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: `Bearer ${token}`
      });
    });
  } else {
    msg = "Invalid credentials";
    return res.status(400).json({
        success: false,
        msg
      });
  }
});

app.get("/api/channels/view-data-pie", (req, res) => {
  connection.query(`select * from pie;`, function(err, rows, fields) {
    if (err) {
      console.log("error: ", err);
      throw err;
    }
    res.send(rows);
  });
});

app.get("/api/channels/view-data-bar", (req, res) => {
  connection.query(`select * from bar;`, function(err, rows, fields) {
    if (err) {
      console.log("error: ", err);
      throw err;
    }
    res.send(rows);
  });
});

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));
