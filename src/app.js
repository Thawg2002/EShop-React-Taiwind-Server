import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
import authRouter from "./router/UserRouter";
import ProductRouter from "./router/ProductRouter";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/Shosy-Ecommerce-Starter");

app.use("/api", authRouter);
app.use("/api", ProductRouter);

export const viteNodeApp = app;
