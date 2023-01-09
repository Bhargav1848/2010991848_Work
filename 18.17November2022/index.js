const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var https = require("https");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
const { read } = require("fs");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Templates/index.html");
});

app.post("/form", (req, res) => {
    var city = req.body.city;

    var API_KEY = "f82beee5ab7c607eedb69b825cd75de9";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    console.log(city);
    request(url, (err, response, body) => {
        if (err) {
            console.log("Error");
        } else {
            const data = JSON.parse(body);
            const temperature = data.main.temp;
            res.render("/index.ejs", temperature);
        }
    });
});
app.listen(3020);