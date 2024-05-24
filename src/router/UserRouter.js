import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  refreshTokenController,
  logoutUser,
} from "../controllers/UserController";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.post("/log-out", logoutUser);
router.put("/update-user/:id", authUserMiddleware, updateUser);
router.get("/user",  getAllUsers);
router.delete("/delete-user/:id", authMiddleware, deleteUser);
router.get("/user/:id", authUserMiddleware, getUserById);
// Tạo token mới khi token hết hạn
router.post("/refresh-token", refreshTokenController);

export default router;
