import * as services from "../services";
import { internalServerError, badRequest } from "../middleware/handle_error";

export const checkout = async (req, res) => {
  try {
    const data = req.body
    const response = await services.checkout(data);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
