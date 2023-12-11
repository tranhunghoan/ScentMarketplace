import db from "../models";

export const checkout = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const cart = data.proList
      console.log(cart)
      resolve(cart);
    } catch (error) {
      console.log(error)
        reject(error)
    }
  });
