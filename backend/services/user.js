import db from "../models";
import jwt from "jsonwebtoken";

export const getOne = ( userId ) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        attributes:{
            exclude: ['password']
        }
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got user successfully" : "User not found",
        userData: response
      });
    } catch (error) {
        reject(error)
    }
  });


  export const updateUserInfo = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const accessToken = data.accessToken.split(" ")[1];
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      const userId = decodedToken.id || null;
      const user = await db.User.findByPk(userId);
      if (!user) {
        resolve({
          err: 1,
          mes: "User not found",
        });
      
      }else
      {
        user.username = data.username;
        user.email = data.email;
        user.phone = data.phone;
        user.address = data.address;
        await user.save();
      }

      resolve({
        err: 0,
        mes: "User update successfully",
      });
    } catch (error) {
      console.error("Error in update function:", error);
      reject(error);
    }
  });
