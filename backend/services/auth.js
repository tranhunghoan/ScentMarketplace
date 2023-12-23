import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ username, email, phone, password, address }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          username,
          email,
          phone,
          password: hashPassword(password),
          address,
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              username: response[0].username,
              phone: response[0].phone,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register successfully" : "Phone already taken",
        token,
      });
    } catch (error) {
      // Handle the error here
      console.error("Error in register function:", error);
      reject(error);
    }
  });

export const login = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true,
      });
      const isCheck =
        response && bcrypt.compareSync(password, response.password);
      const token = isCheck
        ? jwt.sign(
            {
              id: response.id,
              username: response.username,
              phone: response.phone,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "Login successfully"
          : response
          ? "Incorrect password"
          : "Phone not found",
        access_token: token ? `Bearer ${token}` : null,
      });
    } catch (error) {}
  });

  export const changePassword = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const accessToken = data.accessToken.split(" ")[1];
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      const userId = decodedToken.id || null;
      const user = await db.User.findByPk(userId);
      if (!user) {
        resolve({
          err: 0,
          mes: "User not found",
        });
        return;
      }

      if (!bcrypt.compareSync(data.oldPassword, user.password) ) {
        resolve({
          err: 1,
          mes: "Old password is incorrect",
        });
        return;
      }

      user.password = hashPassword(data.newPassword);
      await user.save();

      resolve({
        err: 2,
        mes: "Password changed successfully",
      });
    } catch (error) {
      console.error("Error in changePassword function:", error);
      reject(error);
    }
  });

