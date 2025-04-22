import { Router } from "express";
import { createUser, updateUser, getUsers,currentUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/create").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/get").get(getUsers);
router.route("/current/:id").get(currentUser);
router.route("/delete/:id").delete(deleteUser);

export default router;