const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const database = require("./Public/connection"); //? connecting database
const hashIt = require("./Public/hashIt")
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 60 * 1000 } //5 minutes
}));
app.set('view engine', 'ejs');


const conn = database("nodelogin")


app.get("/", function(request, response) {
    if (request.session.loggedin) {
        response.render("dashboard", { username: request.session.username });
    } else {
        response.send('Please login to view this page! <a href="/login">Login</a>');
    }
    response.end()
});



app.get("/login", function(req, res) {
    if (req.session.loggedin) {
        res.redirect("/")
    } else {
        res.render("login", { err: "" })
    }
});


app.get("/register", function(req, res) {
    if (req.session.loggedin) {
        res.redirect("/")
    } else {
        res.render("register", { err: "" })
    }
});



app.post('/login', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, hashIt(password)], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                conn.query('SELECT * FROM time', (err, row) => {
                    setTimeout(() => {
                        console.log("ALERT:Session Expired")
                        request.session.destroy()
                    }, row[0]['time'] * 60 * 1000);
                })
                response.redirect('/');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

const authenticate = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.redirect("/login");
    }
}
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login")
})

app.get("/", authenticate, (req, res) => {
    res.json({
        "Current user": req.session.username
    })
})
app.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    if (cpassword != password) {
        res.json({
            'message': "Passsword Mismatch"
        })
    }
    if (username && password) {
        conn.query('SELECT * FROM users WHERE email = ?', [username], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.json({
                    'message': "User already Exist"
                })
            } else {
                conn.query('INSERT INTO users VALUES (?,?,?)', [null, username, hashIt(password)], (err, Res) => {
                    if (err) {
                        res.json({
                            'message': "Server Failure"
                        })
                    } else {
                        req.session.loggedin = true;
                        req.session.username = username;
                        conn.query('SELECT * FROM time', (err, row) => {
                            setTimeout(() => {
                                console.log("ALERT:Session Expired")
                                request.session.destroy()
                            }, row[0]['time'] * 60 * 1000);
                        })
                        res.json({
                            'message': "Registered Successfuly"
                        })
                    }
                })
            }
        });
    } else {
        res.json({
            'message': "Please Send Username"
        })
    }

})


app.listen(3000, function(req, res) {
    console.log("port 3000 active")
});