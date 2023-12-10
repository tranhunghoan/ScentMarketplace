import * as services from "../services";
import { internalServerError, badRequest } from "../middleware/handle_error";


export const insertPro = async (req, res) => {
  try {
    const response = await services.insertPro();
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
export const insertBlog = async (req, res) => {
  try {
    const response = await services.insertBlog();
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};