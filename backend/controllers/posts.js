import db from "../db.js";
import mysql from "mysql";
import jwt from "jsonwebtoken";

export const getAllPosts = (req, res) => {
    const getQuery = req.query.category ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts";
    const query = mysql.format(getQuery, [req.query.category]);
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}

export const getSinglePost = (req, res) => {
    const postId = req.params.id;
    const getQuery = "SELECT title, description, username, thumbnail, img AS userImage, created_at, updated_at, category FROM posts p JOIN users u ON p.uid = u.id  WHERE p.id = ?";
    const query = mysql.format(getQuery, [postId]);
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data[0]);
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    // if tocken exist then verify the token
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        // if token is valid then add the post to database
        const addQuery = "INSERT INTO posts(`title`, `category`, `thumbnail`, `description`, `uid`) VALUES (?,?,?,?,?)";
        const query = mysql.format(addQuery, [
            req.body.title,
            req.body.category,
            req.body.thumbnail,
            req.body.description,
            userInfo.id,
        ]);
        db.query(query, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });
    });
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    // if tocken exist then verify the token
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        // if token is valid then delete the post from database
        const postId = req.params.id;
        const deleteQuery = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        const query = mysql.format(deleteQuery, [postId, userInfo.id]);
        db.query(query, (err, response) => {
            if (err) return res.status(403).json("You can delete only your post!");
            return res.json({status:"Post has been deleted!", response});
        });
    });
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    // if tocken exist then verify the token
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        // if token is valid then delete the post from database
        const postId = req.params.id;
        const updateQuery = "UPDATE posts SET `title`= ?,`description`= ?,`thumbnail`= ?,`category`= ? WHERE `id` = ? AND `uid` = ?";
        const query = mysql.format(updateQuery, [req.body.title, req.body.description, req.body.thumbnail, req.body.category, postId, userInfo.id]);
        db.query(query, (err, response) => {
            if (err) return res.status(500).json(err);
            return res.json({status:"Post has been updated.", response});
        });
    });
}

