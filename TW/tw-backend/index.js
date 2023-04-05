const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 60 * 1000 }, //5 minutes
  })
);

const conn = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "node_restapi",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected with App...");
});

app.post("/create", (req, res) => {
  let data = {
    title: req.body.title,
    body: req.body.body,
    createdUser: req.body.usr,
  };

  let sqlQuery = "INSERT INTO items SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    else {
      res.redirect("/home");
    }
  });
});

app.get("/api/items", (req, res) => {
  let sqlQuery = "SELECT * FROM items";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});
app.get("/create", function (req, res) {
  res.render("create");
});

app.get("/api/items/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id + " LIMIT 1";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.render("show", { results });
  });
});

app.get("/edit/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id + " LIMIT 1";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.render("edit", { results });
  });
});

app.delete("/api/items/:id", (req, res) => {
  let sqlQuery = "DELETE FROM items WHERE id=" + req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}
app.get("/home", function (req, res) {
  let sqlQuery = "SELECT * FROM items";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.render("home", { results });
  });
});
app.get("/login", function (req, res) {
  if (req.session.loggedin) {
    res.redirect("/");
  } else {
    res.render("login", { err: "" });
  }
});

app.get("/register", function (req, res) {
  if (req.session.loggedin) {
    res.redirect("/");
  } else {
    res.render("register", { err: "" });
  }
});

app.post("/login", function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  if (username && password) {
    conn.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [username, hashIt(password)],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          conn.query("SELECT * FROM time", (err, row) => {
            setTimeout(() => {
              console.log("ALERT:Session Expired");
              request.session.destroy();
            }, row[0]["time"] * 60 * 1000);
          });
          response.redirect("/");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

const authenticate = (req, res, next) => {
  if (req.session.loggedin) {
    next();
  } else {
    res.redirect("/login");
  }
};
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/", authenticate, (req, res) => {
  res.json({
    "Current user": req.session.username,
  });
});
app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let cpassword = req.body.cpassword;
  if (cpassword != password) {
    res.json({
      message: "Passsword Mismatch",
    });
  }
  if (username && password) {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [username],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.json({
            message: "User already Exist",
          });
        } else {
          conn.query(
            "INSERT INTO users VALUES (?,?,?)",
            [null, username, hashIt(password)],
            (err, Res) => {
              if (err) {
                res.json({
                  message: "Server Failure",
                });
              } else {
                req.session.loggedin = true;
                req.session.username = username;
                conn.query("SELECT * FROM time", (err, row) => {
                  setTimeout(() => {
                    console.log("ALERT:Session Expired");
                    request.session.destroy();
                  }, row[0]["time"] * 60 * 1000);
                });
                res.json({
                  message: "Registered Successfuly",
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.json({
      message: "Please Send Username",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
