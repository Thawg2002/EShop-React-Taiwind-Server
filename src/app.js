import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./router/UserRouter";
import ProductRouter from "./router/ProductRouter";
import OrderRouter from "./router/OrderRouter";
import PaymentRouter from "./router/PaymentRouter";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();
// Tăng giới hạn kích thước payload
app.use(bodyParser.json({ limit: "10mb" })); // Giới hạn cho JSON payload
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // Giới hạn cho URL-encoded payload
app.use(express.json());
app.use(morgan("tiny"));
//Lấy client id từ .env
const CLIENT_ID = process.env.CLIENT_ID;
console.log("CLIENT_ID", CLIENT_ID);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/Shosy-Ecommerce-Starter");

app.use("/api", authRouter);
app.use("/api", ProductRouter);
app.use("/api", OrderRouter);
app.use("/api", PaymentRouter);

export const viteNodeApp = app;
