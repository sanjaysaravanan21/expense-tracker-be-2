import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import itemsRouter from "./routes/item.js";
import userRouter from "./routes/user.js";
import healthRouter from "./routes/health.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const logger = (req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
};

app.use(logger);

const port = process.env.PORT || 4500;

const authMiddleWare = (req, res, next) => {
  const token = req.headers["authorization"];

  jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      req.body = { phoneNumber: data.phoneNumber, ...req.body };
      next();
    }
  });
};

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to Mongo DB");
    app.use("/items", authMiddleWare, itemsRouter);
    app.use("/server", healthRouter);
    app.use("/users", userRouter);
    app.listen(port, () => {
      console.log("Server listening on", port);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
