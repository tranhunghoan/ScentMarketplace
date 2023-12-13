import db from "../models";
import jwt from "jsonwebtoken";

export const checkout = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(data);
      const accessToken = data.accessToken.split(" ")[1];
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      const userId = decodedToken.id;
      const proList = data.proList;
      const payment = data.payment;


      // console.log(data);
      // Create a new cart
      const newCart = await db.Cart.create({ isPurchased: 0 });

      // Loop through proList and insert into cartitems
      for (const proItem of proList) {
        await db.CartItem.create(
          {
            cartID: newCart.id,
            proID: proItem.id,
            quantity: proItem.item,
          }
        );

        // Insert into purchasehistories
        await db.PurchaseHistory.create(
          {
            userID: userId,
            cartID: newCart.id,
            payment: payment,
          }
        );


      }
      resolve({
        message: "Data saved successfully" 
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
