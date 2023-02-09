const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const app = express();
const config = require('../config.json');

app.use(cors());

app.get("/api/", (req, res) => {
    const data = {
        message: 'Hello from the server!'
    };
    res.json(data);
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

// MySQL connection 
const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });