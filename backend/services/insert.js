import db from "../models";
import data from "../data/data.json"

export const insert = () => new Promise(async (resolve, reject) => {
    try {
        data.forEach(async (item) => {
            await db.Product.create({
                image: item.image,
                sex: item.sex,
                concentration: item.concentration,
                incense: item.incense,
                price: item.price,
                brand: item.brand,
                origin: item.origin,
                style: item.style,
                name: item.name,
                description: item.description,
            })
        })
        resolve("ok");
    } catch (error) {
        // Handle the error here
        console.error("Error in register function:", error);
        reject(error);
    }
});