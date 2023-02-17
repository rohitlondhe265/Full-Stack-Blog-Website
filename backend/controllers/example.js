import mysql from "mysql"
import db from "../db.js";

export const getTodos = (req, res)=>{
    const getQuery = 'SELECT * FROM ??';
    const query = mysql.format(getQuery, ["todo"]);

    db.query(query, (err, response)=>{
        if(err) res.json(ree);
        res.json(response)
    });
}

export const postTodo = (req, res)=>{
    const data = req.body;
    const insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    const query = mysql.format(insertQuery,["todo","user","notes",data.user,data.value]);
    db.query(query,(err, response) => {
        if(err) {
           res.json(err);
        }
        res.json(response);
    });
}

