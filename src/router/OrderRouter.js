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

router.post("/order/create", authMiddleware, createOrder);
router.get("/order/get-all/:id", authMiddleware, getAllOrderDetails);
router.get("/order/get/:id", authMiddleware, getDetailsOrder);
router.delete("/order/cancel/:id", authMiddleware, cancelOrderDetails);
router.get("/order/get-all-orders", authMiddleware, getAllOrder);

export default router;
