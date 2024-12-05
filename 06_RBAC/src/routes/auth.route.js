import { Router } from "express";
import { loginUser, registerUser, allUsers } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allusers").get(allUsers);

export default router;