import  express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);


app.listen(PORT, ()=>{
    console.log(`Backend listening on port ${PORT}`);
});