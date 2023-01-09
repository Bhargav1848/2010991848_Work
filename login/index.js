const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const db = require("./database");
const conn = db("admin");
const app = express();
const hashIt = require("./hashit");

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = hashIt(req.body.password);
    let query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

    conn.query(query, (err, result) => {
        if (err) console.log(err);
        console.log("Registered Successfuly");
        res.redirect("/");
    });
});

app.post("/", (req, res) => {
    let username = req.body.username;
    let password = hashIt(req.body.password);
    username = username.replaceAll(" ", "-");
    password = password.replaceAll(" ", "-");

    let query = `SELECT * FROM users where username= '${username}' && password='${password}'`;
    conn.query(query, (err, result) => {
        if (err) console.log(err);
        if (result.length) console.log("Logged Successfuly");
        else console.log("Your not a valid user");
        res.redirect("/");
    });
});
app.listen(3020, () => {
    console.log("Listening of port 3020");
});