import mysql from "mysql"

//Connection Pooling is a mechanism to maintain a cache of database connection so that the connection can be reused after releasing it.
const db = mysql.createPool({
   connectionLimit: 100,
   host: 'localhost',
   user: 'root',
   password: 'Rohit9011@#',
   database: 'blog',
   debug: false
});

db.getConnection((error, connection) => {
   if (error) throw error;
   console.log("connected to database with thread id: " + connection.threadId);
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Rohit9011@#',
//   database: 'blog'
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Server!');
// });
export default db;
