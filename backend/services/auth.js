import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { username },
        defaults: {
          username,
          password: hashPassword(password),
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              username: response[0].username,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register successfully" : "Username already taken",
        token
      });
    } catch (error) {}
  });


export const login = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({  
        where: { username },
        raw:true
      });
      const isCheck = response && bcrypt.compareSync(password, response.password)
      const token = isCheck ? jwt.sign(
            {
              id: response.id,
              username: response.username,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token ? "Login successfully" : response ? 'Incorrect password': 'Username not found',
        'access_token': token ? `Bearer ${token}` : null
      });
    } catch (error) {}
  });