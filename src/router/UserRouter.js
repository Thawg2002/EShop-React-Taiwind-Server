import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  refreshTokenController,
} from "../controllers/UserController";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.put("/update-user/:id", updateUser);
router.get("/user", authMiddleware, getAllUsers);
router.delete("/delete-user/:id", authMiddleware, deleteUser);
router.get("/user/:id", authUserMiddleware, getUserById);
// Tạo token mới khi token hết hạn
router.get("/refresh-token", refreshTokenController);

export default router;
