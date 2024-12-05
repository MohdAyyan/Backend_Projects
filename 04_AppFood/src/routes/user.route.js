import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getCurrentUser, resetUserPassword, changeUserPassword, deleteUser } from "../controllers/user.controller.js";


const router = Router();

router.route("/currentUser").get( verifyJWT, getCurrentUser);
router.route("/resetPassword").post(verifyJWT,resetUserPassword);
router.route("/changeUserPassword").post(verifyJWT,changeUserPassword);
router.route("/deleteUser/:id").delete(verifyJWT,deleteUser);

export default router;
