import * as controllers from "../controllers"
import  express from "express";

const router = express.Router();
router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.post('/changePassword', controllers.changePassword);

module.exports = router;