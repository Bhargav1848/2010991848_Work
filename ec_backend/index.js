const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const conn = mysql.createConnection({
  host: "localhost",
  user: "root" /* MySQL User */,
  password: "" /* MySQL Password */,
  port: 3307,
  database: "node_ec" /* MySQL Database */,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected with App...");
});
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/auth", function (req, res) {
  let username = req.body.uname;
  let password = req.body.passwd;
  req.session.usrtyp = 0;
  if (username && password) {
    conn.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          // console.log(results);
          req.session.loggedin = true;
          req.session.username = username;
          // req.session.isAdmin = results.isAdmin;
          results.forEach((result) => {
            req.session.usrtyp = result.isAdmin;
          });
          if (req.session.usrtyp == 1) {
            res.redirect("/dashboard");
          } else {
            res.redirect("/");
          }
        } else {
          res.send(`<center><b>
          Incorrect Username and / or Password!
          </center ></b>`);
        }
        res.end();
      }
    );
  } else {
    res.send(`<center><b>
    Please enter Username and Password!
    </center ></b>`);
    res.end();
  }
});

app.get("/cart", (req, res) => {
  if (!req.session.loggedin) {
    res.render("login");
  } else {
    conn.query(
      "SELECT DISTINCT p_id,user,time,price,p_name,quantity FROM cart WHERE user = ? GROUP BY p_id",
      [req.session.username],
      function (error, results, fields) {
        // console.log(results, req.session.uname);
        res.render("cart", {
          results,
          isloggedIn: req.session.loggedin,
          username: req.session.username,
        });
      }
    );
  }
});

app.post("/register", function (req, res) {
  let username = req.body.uname;
  let password = req.body.passwd;
  let cpassword = req.body.cpasswd;
  if (cpassword != password) res.send("Password Do Not match");
  if (username && password) {
    conn.query(
      "INSERT INTO users VALUES (null,?,?,?)",
      [username, password, 0],
      function (error, results, fields) {
        if (error) throw error;
        else {
          req.session.loggedin = true;
          req.session.username = username;
          req.session.usrtype = 0;
          res.send("Registered Successfuly!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

app.get("/dashboard", function (req, res) {
  if (req.session.loggedin && req.session.usrtyp) {
    res.render("dashboard");
  } else {
    res.render("message", { message: "Not Authorized", classname: "warning" });
  }
});

app.get("/logout", (req, res) => {
  req.session.loggedin = false;
  req.session.usrtyp = null;
  req.session.username = null;
  res.redirect("/");
});

app.get("/addp", function (req, res) {
  if (req.session.loggedin && req.session.usrtyp) {
    let sqlQuery = "SELECT * FROM types";

    let query = conn.query(sqlQuery, (err, results) => {
      if (err) throw err;

      res.render("add_pro", {
        results,
        isloggedIn: req.session.loggedin,
        username: req.session.username,
      });
    });
  } else {
    res.render("message", {
      message: "Not Authorized",
      classname: "warning",
      isloggedIn: req.session.loggedin,
      username: req.session.username,
    });
  }
});
app.post("/addp", function (req, res) {
  let data = {
    name: req.body.name,
    des: req.body.des,
    price: req.body.price,
    sale_price: req.body.saleprice,
    type_id: req.body.category,
    image: req.body.image,
    quantity: req.body.quantity,
  };
  let sqlQuery = "INSERT INTO products SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    else {
      res.redirect("/");
    }
  });
  //   console.log(data);
});

app.get("/", function (req, res) {
  let sqlQuery =
    "SELECT types.type,products.id,products.name,products.des,products.price,products.sale_price,products.image,products.quantity FROM `types` INNER JOIN products ON products.type_id = types.id";
  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    else {
      // console.log(results);
      res.render("home", {
        results: results,
        isloggedIn: req.session.loggedin,
        username: req.session ? req.session.username : "",
      });
    }
  });
});

app.get("/details/:id", function (req, res) {
  var id = req.params.id;
  let sqlQuery = "SELECT * from products where id=" + id;
  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    else {
      res.render("product", { results });
    }
  });
});

// app.get("/checkout/:id", (req, res) => {
//   //   console.log(req.session.username);
//   if (req.session.loggedin) {
//     res.render("buy_prod", { id: req.params.id });
//   } else {
//     res.render("login");
//   }
// });
app.post("/checkout/:id", (req, res) => {
  let p_id = req.params.id;
  let address = req.body.address;
  let mode = req.body.mode;
  let order_id = "_id" + Math.random().toString(16).replace(".", "");
  let tracking_id = "_id" + Math.random().toString(16).replace(".", "");
  //   console.log(order_id);
  if (address && mode) {
    conn.query(
      "INSERT INTO orders VALUES (null,?,?,?,?,?,?,?)",
      [p_id, req.session.username, order_id, address, 0, tracking_id, mode],
      function (error, results, fields) {
        if (error) throw error;
        else {
          res.send("Order Placed");
        }
        res.end();
      }
    );
  } else {
    res.send("Enter a valid address and mode!");
  }
});
app.get("/orders", (req, res) => {
  if (req.session.loggedin) {
    if (req.session.usrtyp == 1) {
      conn.query(
        "SELECT * FROM orders",
        [req.session.username],
        (err, result) => {
          res.render("orders", {
            results: result,
            isloggedIn: req.session.loggedin,
            username: req.session.username,
            admin: 1,
          });
        }
      );
    } else {
      conn.query(
        "SELECT * FROM orders WHERE usr_buy=?",
        [req.session.username],
        (err, result) => {
          res.render("orders", {
            results: result,
            isloggedIn: req.session.loggedin,
            username: req.session.username,
            admin: 0,
          });
        }
      );
    }
  } else {
    res.render("login");
  }
});
app.get("/addtocart/:id/:price/:name/:quantity", (req, res) => {
  const pid = req.params.id;
  const price = req.params.price;
  const name = req.params.name;
  const quantity = req.params.quantity;
  if (req.session.loggedin) {
    conn.query(
      "INSERT INTO cart VALUES (?,?,?,?,?,?,?)",
      [null, pid, req.session.username, null, price, name, quantity],
      (err, result) => {
        if (err) console.log(err);
        else {
          // alert("heloo");
          res.redirect("/");
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});
app.post("/update/:o_id", (req, res) => {
  const tracking = req.body.oid;
  conn.query(
    "UPDATE orders SET tracking=? WHERE id=?",
    [tracking, req.params.o_id],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.redirect("/orders");
      }
    }
  );
});
app.get("/deletecart/:id", (req, res) => {
  conn.query(
    `DELETE FROM cart WHERE p_id=?`,
    [req.params.id],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.redirect("/cart");
      }
    }
  );
});

app.post("/postcart", (req, res) => {
  const data = req.body.data;
  const here = data.length;
  data.forEach((item, idx) => {
    let productid = item["pid"];
    // console.log(productid);
    let quantity = item["quantity"];
    let address = item["address"];
    let mode = item["mode"];
    conn.query(
      `DELETE FROM cart WHERE user=?`,
      [req.session.username],
      (err, result) => {
        if (err) console.log(err);
      }
    );

    conn.query(
      `SELECT quantity FROM products WHERE id=?`,
      [productid],
      (err, result) => {
        const currentQuantity = result[0]["quantity"];
        conn.query(
          "UPDATE products SET quantity=? WHERE id=?",
          [
            currentQuantity - quantity >= 0 ? currentQuantity - quantity : 0,
            productid,
          ],
          (err, result) => {
            if (err) console.log(err);
          }
        );
      }
    );

    let tracking_id = "_id" + Math.random().toString(16).replace(".", "");
    let order_id = "_id" + Math.random().toString(16).replace(".", "");
    conn.query(
      "INSERT INTO orders VALUES (null,?,?,?,?,?,?,?)",
      [
        productid,
        req.session.username,
        order_id,
        address,
        0,
        tracking_id,
        mode,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
  });
  res.render("message", {
    message: "Order Placed",
    classname: "Success",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
