import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
} from "../controllers/OrderController";

const router = express.Router();

router.post("/create/:id", authMiddleware, createOrder);
router.get("/get-all/:id", authMiddleware, getAllOrderDetails);
router.get("/get/:id", authMiddleware, getDetailsOrder);
router.delete("/cancel/:id", authMiddleware, cancelOrderDetails);
router.get("/get-all-orders", authMiddleware, getAllOrder);

export default router;
