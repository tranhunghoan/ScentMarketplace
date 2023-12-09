import db from "../models";
import data from "../data/data.json"

export const insert = () => new Promise(async (resolve, reject) => {
    try {
        console.log(Object.keys(data))
        resolve("ok");
    } catch (error) {
        // Handle the error here
        console.error("Error in register function:", error);
        reject(error);
    }
});