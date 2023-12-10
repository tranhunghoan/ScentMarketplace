import db from "../models";
import dataPro from "../data/dataPro.json"
import dataBlog from "../data/dataBlog.json"

export const insertPro = () => new Promise(async (resolve, reject) => {
    try {
        dataPro.forEach(async (item) => {
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
        resolve("Inserted product list successfully");
    } catch (error) {
        // Handle the error here
        console.error("Error in product function:", error);
        reject(error);
    }
});
export const insertBlog = () => new Promise(async (resolve, reject) => {
    try {
        dataBlog.forEach(async (item) => {
            await db.Blog.create({
                title: item.title,
                image: item.image,
                date: item.date,
                content: item.content
            })
        })
        resolve("Inserted blog list successfully");
    } catch (error) {
        // Handle the error here
        console.error("Error in blog function:", error);
        reject(error);
    }
});