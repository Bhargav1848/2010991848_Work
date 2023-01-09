const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 4020;

const conn = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "node_restapi",
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Database Connected");
});

app.get("/api/items", (req, res) => {
    let query = "SELECT * FROM items";

    conn.query(query, (err, row) => {
        if (err) throw err;
        // res.send(apiResponse(row));
        res.render("index", { list: row });
    });
});

app.get("/api/items/:id", (req, res) => {
    let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        // res.send(apiResponse(results));
        res.render("index", { list: results });
    });
});

app.post("/api/items", (req, res) => {
    let data = { title: req.body.title, body: req.body.body };
    let query = "INSERT INTO items SET ?";

    conn.query(query, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

app.put("/api/items/:id", (req, res) => {
    let sqlQuery =
        "UPDATE items SET title='" +
        req.body.title +
        "', body='" +
        req.body.body +
        "' WHERE id=" +
        req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

app.delete("/api/items/:id", (req, res) => {
    let sqlQuery = "DELETE FROM items WHERE id=" + req.params.id + "";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

function apiResponse(results) {
    return JSON.stringify({ status: 200, error: null, response: results });
}
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});