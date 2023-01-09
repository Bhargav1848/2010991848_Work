const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const createItem = require("./Create");
let list = require("./list");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index", { list: list });
});
app.post("/", (req, res) => {
    const desc = req.body.description;
    const deadline = req.body.deadline;
    const item = createItem(desc, deadline);
    res.render();
});
app.get("/add", (req, res) => {
    res.render("add");
});
app.get("/delete", (req, res) => {
    res.end("delete");
});
app.get("/edit/:id", (req, res) => {});
// qpp.post("/edit")

app.listen(4020);