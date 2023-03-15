import express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import testRoutes from "./routes/example.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from 'multer';

const app = express();
const PORT = 8800;

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// file upload using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.get("/api", (req, res) => {
  res.json("your backend is working ....");
});
app.use("/test", testRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});