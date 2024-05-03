import {
  CreateUser,
  Signin,
  UpdateUser,
  deleteUserSV,
  getAllUserSV,
  getUserByIdSV,
} from "../server/UserSevice";
import { refreshTokenSV } from "../server/JwtService";
export const createUser = async (req, res) => {
  try {
    // console.log(req.body);
    const {  email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if ( !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const data = await CreateUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    }
    const data = await Signin(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const data = await UpdateUser(userId, req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const data = await deleteUserSV(userId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const data = await getAllUserSV();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const data = await getUserByIdSV(userId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const refreshTokenController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }

    const data = await refreshTokenSV(token);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
