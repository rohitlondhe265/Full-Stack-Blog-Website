import mysql from "mysql"

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Rohit9011@",
    database: "Blog"
});

export default db;

