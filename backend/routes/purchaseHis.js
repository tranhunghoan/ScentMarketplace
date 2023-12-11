import * as controllers from "../controllers"
import  express from "express";
const router = express.Router();

router.post('/', controllers.checkout);

module.exports = router;