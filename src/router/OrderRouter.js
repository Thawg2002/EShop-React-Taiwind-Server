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

router.post("/order/create", createOrder);
router.get("/order/get-all-order-detail/:id", authMiddleware, getAllOrderDetails);
router.get("/order/get-details-order/:id",  getDetailsOrder);
router.delete("/order/cancel/:id",  cancelOrderDetails);
router.get("/order/get-all-orders", authMiddleware, getAllOrder);

export default router;
