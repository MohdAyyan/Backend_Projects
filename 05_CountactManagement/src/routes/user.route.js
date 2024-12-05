import { Router } from "express";
const router = Router();
import { registerUser, loginUser, currentUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(verifyToken,currentUser);


export default router;