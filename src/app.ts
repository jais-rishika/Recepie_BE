import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import followRouter from "./routes/follow.route.js";
import recepieRouter from "./routes/recepie.route.js";
import likeRouter from "./routes/like.routes.js";
import favouriteRouter from "./routes/favourite.route.js";
import commentRouter from "./routes/comment.route.js";


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/recepie", recepieRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/favourite", favouriteRouter);
app.use("/api/v1/comment", commentRouter);

export { app };
