import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//routes

import userRouter from "./routes/user.routes.js";
import articleRoute from "./routes/article.routes.js";
import likeRoute from "./routes/like.routes.js";
import commentRoute from "./routes/comment.route.js";
import userMediaRoute from "./routes/doubtMedia.routes.js";
import mediaComment from "./routes/doubtMediaComment.route.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/userArticle", articleRoute);
app.use("/api/v1/userLike", likeRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/mediaComments", mediaComment);
app.use("/api/v1/mediaRoute", userMediaRoute);

export { app };
