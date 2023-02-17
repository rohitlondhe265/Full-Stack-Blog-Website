import express from "express";
import { getTodos, postTodo } from "../controllers/example.js";

const router = express.Router();

router.post("/", postTodo);
router.get("/", getTodos);

export default router;