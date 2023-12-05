import jwt from "jsonwebtoken";
import { notAuth } from "./handle_error";
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return notAuth("login require");
  const accessToken = token.split(' ')[1];  
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return notAuth("access token may expired or invalid", res);

    req.user = user;
    next();
  });
};

export default verifyToken;
