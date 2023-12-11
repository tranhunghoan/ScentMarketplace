import db from "../models";

export const getAllPro = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findAll({
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got product list successfully" : "Product list not found",
        proList: response
      });
    } catch (error) {
        reject(error)
    }
  });
