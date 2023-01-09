const express = require("express"); //?epxress used for making APIs
const bodyParser = require("body-parser"); //?to fetch data from form
const request = require("request"); //? to making request
const db = require("./list"); //?importing the database
const createItem = require("./Create");
//!initializing app
app = express();

//!additional usage regarding app
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//!----------------home route
app.get("/", (req, res) => {
    res.render("index", { list: db });
});

//!----------------- add route
app.post("/add", (req, res) => {
    const desc = req.body.desc;
    const deadline = req.body.deadline;

    const item = createItem(desc, deadline, db);
    db.push(item);
    res.redirect("/");
});
app.get("/add", (req, res) => {
    res.render("add");
});

//!-------------------delete route
app.get("/delete/:id", (req, res) => {
    for (var i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            db.splice(i, 1);
            break;
        }
    }
    res.redirect("/");
});

//!---------------------edit route
app.get("/edit/:id", (req, res) => {
    var desc = "";
    var deadline = "";
    for (var i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            desc = db[i].description;
            deadline = db[i].deadline;
        }
    }

    res.render("edit", {
        description: desc,
        id: req.params.id,
        deadline: deadline,
    });
});

app.post("/edit/:id", (req, res) => {
    const desc = req.body.desc;
    const deadline = req.body.deadline;
    for (var i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            if (desc != db[i].description) db[i].description = desc;
            if (deadline != db[i].deadline) db[i].deadline = deadline;
        }
    }
    res.redirect("/");
});

//!----------------------status route
app.get("/status/:id", (req, res) => {
    for (var i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            db[i].status = !db[i].status;
        }
    }
    res.redirect("/");
});

//?listening on port number 5020
app.listen(5020);