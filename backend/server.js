// const express = require('express')
import express from "express";
import { connectDb } from "./config/dbconfig.js";

// routes
import userRoutes from "./routes/users.route.js";
import videoRoutes from "./routes/videos.route.js";
import commentRoutes from "./routes/comments.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 8800;

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// handling error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connectDb();
  console.log(`server berjalana di port ${port}`);
});
