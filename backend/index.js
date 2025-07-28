import express from "express";
import mongoose from "mongoose";
import { userRoute } from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import channelRoute from "./routes/chennel.route.js";
import { commentRoutr } from "./routes/comment.route.js";
import { vedioRoute } from "./routes/video.route.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT ;
mongoose
  .connect("mongodb://localhost:27017/youtube-clone")
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });


  userRoute(app);
  channelRoute(app)
  commentRoutr(app)
  vedioRoute(app)