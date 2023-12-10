import db from "../models";

export const getAllBlog = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Blog.findAll({
        order: [
          ['id', 'DESC'],
      ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got blog list successfully" : "Blog list not found",
        blogList: response
      });
    } catch (error) {
        reject(error)
    }
});
