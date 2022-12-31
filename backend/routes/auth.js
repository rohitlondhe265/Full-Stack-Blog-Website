import express from "express"
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.get("/logout", (req, res)=>{
    res.json("hidhfgi")
});

router.post("/register", register);

router.post("/login", login);
router.post("/logout", logout);


export default router;