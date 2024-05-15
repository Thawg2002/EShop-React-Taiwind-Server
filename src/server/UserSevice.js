import UserModel from "../model/UserModel";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { genneralAccessToken, genneralRefreshToken } from "./JwtService";
export const CreateUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, confirmPassword } = newUser;
    try {
      const checkUser = await UserModel.findOne({ email });
      if (checkUser != null) {
        resolve({
          status: "ERR",
          message: "The email is already",
        });
      }
      const passwordhash = await bcryptjs.hash(password, 10);
      const user = await UserModel.create({
        email,
        password: passwordhash,
      });
      if (CreateUser) {
        resolve({
          status: "OK",
          message: "signup success",
          data: user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const Signin = (userlogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userlogin;
    try {
      const checkUser = await UserModel.findOne({ email });
      if (!checkUser) {
        resolve({
          status: "ERR",
          message: "The email is not defined",
        });
      }
      const comparePassword = await bcryptjs.compare(
        password,
        checkUser.password
      );
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is correct",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      //refresh-token nó sẽ cấp lại token mới khi acccess token hết hạn
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      // checkUser.password=undefined;
      if (Signin) {
        resolve({
          status: "OK",
          message: "login success",
          data: checkUser,
          access_token: access_token,
          refresh_token: refresh_token,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const UpdateUser = (id, data) => {
  // console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await UserModel.findOne({ _id: id });
      // console.log(checkUser);
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      const userUpdate = await UserModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      // console.log("Updated user", user);
      if (UpdateUser) {
        resolve({
          status: "OK",
          message: "Update tài khoản thành công",
          userUpdate,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteUserSV = (id) => {
  // console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await UserModel.findOne({ _id: id });
      // console.log(checkUser);
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      const user = await UserModel.findByIdAndDelete(id);
      // console.log("Updated user", user);
      if (deleteUserSV) {
        resolve({
          status: "OK",
          message: "Delete tài khoản thành công",
          user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllUserSV = () => {
  // console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserModel.find();
      // console.log("Updated user", user);
      if (getAllUserSV) {
        resolve({
          status: "OK",
          user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const getUserByIdSV = (id) => {
  // console.log("fawfwa");
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (getUserByIdSV) {
        resolve({
          status: "OK",
          user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const refreshTokenSV = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, "refresh_token", async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "The authentication",
          });
        }
        const access_token = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        // console.log("access_token new: " + access_token);

        if (refreshTokenSV) {
          resolve({
            status: "OK",
            message: "The SUSSCESS TOKEN NEW",
            access_token,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
