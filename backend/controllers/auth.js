import * as services from "../services";
import { internalServerError, badRequest } from "../middleware/handle_error";
import { password } from "../helpers/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
  try {
    
    const {error} = joi.object( password).validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        err: 1,
        mes: "Missing payloads",
      });
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
