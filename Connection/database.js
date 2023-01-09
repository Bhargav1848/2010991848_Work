const mysql = require("mysql");

const database = (db_name) => {
    const conn = mysql.createConnection({
        host: "localhost",
        port: 3307,
        user: "root",
        password: "",
        database: db_name,
    });

    conn.connect((err) => {
        if (err) console.log(err);
        console.log(db_name + " database Connected!");
    });
    return conn;
};

module.exports = database;