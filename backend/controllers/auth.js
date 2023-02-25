import db from "../db.js"
import mysql from 'mysql'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const register = (req, res) => {
    // check for the existing user
    const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
    const query = mysql.format(checkQuery, [req.body.email, req.body.username])
    db.query(query, (err, data) => {

        if (err) return res.json(err);
        if (data.length) return res.status(409).json("user already exists");
        // If user does not exists create new one
        // 1. Hashing the password using bcrypt
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(myPlaintextPassword, salt);
        // 2. store the new users imformation in database
        const registerQuery = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)"
        const query = mysql.format(registerQuery, [
            req.body.username,
            req.body.email,
            hashedPassword,
        ]);
        db.query(query, (err, response) => {
            if (err) return res.json(err);
            return res.status(200).json({status:"user has been created successfully!",response});
        });

    });
}

export const login = (req, res) => {
    // Check if username already exists
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    const query = mysql.format(checkQuery, [req.body.username]);
    db.query(query, (err, data) => {

      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
      // Check if password is correct or not
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      // if password is not correct 
      if (!isPasswordCorrect){
        return res.status(400).json("Wrong username or password!");}
      // if password is correct then generate jwt
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];
      // set the token as cookie in the browser
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
    });
  };

  export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };