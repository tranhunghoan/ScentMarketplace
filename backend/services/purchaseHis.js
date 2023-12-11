import db from "../models";

export const checkout = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data)
      resolve(data);
    } catch (error) {
      console.log(error)
        reject(error)
    }
  });
