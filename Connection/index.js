const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
const database = require("./database");

//?initializing the app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
port = process.env.PORT || 4020;

const db = database("northwind");

app.get("/", (req, res) => {
    db.query("SELECT * FROM student_marks", (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    });
});

app.get("/agrade", (req, res) => {
    db.query("SELECT * FROM student_marks where grade='A'", (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`Listening On ${port}`);
});