import db from "../models";
import jwt from "jsonwebtoken";

export const checkout = (data) =>
  new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      let userId = null;

      if (data.accessToken) {
        const accessToken = data.accessToken.split(" ")[1];
        if (accessToken) {
          const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
          userId = decodedToken.id;
        }
      }

      // Check if user data is provided
      if (data.username && data.address && data.phoneNumber && data.email) {
        // Check if the user already exists
        const existingUser = await db.User.findOne({
          where: { phone: data.phoneNumber },
        });

        if (!existingUser) {
          // If user doesn't exist, create a new user
          await db.User.create({
            id: userId,
            username: data.username,
            address: data.address,
            phone: data.phoneNumber,
            email: data.email,
          });
        }
      }

      const proList = data.proList;
      const payment = data.payment;

      // Create a new cart
      const newCart = await db.Cart.create({ isPurchased: 0 });

      // Loop through proList and insert into cartitems
      for (const proItem of proList) {
        await db.CartItem.create({
          cartID: newCart.id,
          proID: proItem.id,
          quantity: proItem.item,
        });

        // Insert into purchasehistories
        await db.PurchaseHistory.create({
          userID: userId,
          cartID: newCart.id,
          payment: payment,
        });
      }

      resolve({
        purchase: 1,
        message: "Data saved successfully",
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

// export const getOneLis = ( access_token ) =>
// new Promise(async (resolve, reject) => {
//   try {
//     const response = await db.User.findOne({
//       where: { id: userId },
//       attributes:{
//           exclude: ['password']
//       }
//     });
//     resolve({
//       err: response ? 0 : 1,
//       mes: response ? "Got user successfully" : "User not found",
//       userData: response
//     });
//   } catch (error) {
//       reject(error)
//   }
// });
