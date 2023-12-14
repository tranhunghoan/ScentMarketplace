import * as services from "../services";
import { internalServerError, badRequest } from "../middleware/handle_error";
import { password } from "../helpers/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
  try {
    
    // const {error} = joi.object({ username, password }).validate(req.body);
    // if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.register(req.body);
    // console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
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


export const changePassword = async (req, res) => {
  try {
    const response = await services.changePassword(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
