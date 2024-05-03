import express from "express";
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../controllers/ProductController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/products", createProduct);
router.put("/products/:id", authMiddleware, updateProduct);
router.get("/products/:id", getProductById);
router.get("/products", getAllProduct);
router.delete("/products/:id", deleteProduct);
export default router;
