import db from "../db.js";

export const getAllPosts = (req, res) => {

    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data)=>{
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const getSinglePost = (req, res) => {
    const q = "SELECT title, description, username, p.img, u.img AS userImage, cat, posted_date FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data)=>{
        if(err) return res.json(err);
        return res.status(200).json(data[0]);
    })
}

export const addPost = (req, res) => {

}

export const deletePost = (req, res) => {

}

export const updatePost = (req, res) => {

}

