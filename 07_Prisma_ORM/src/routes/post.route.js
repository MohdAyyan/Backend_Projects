import { Router } from "express";
import { createPost, updatePost, getPosts, currentPost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/update/:id").put(updatePost);
router.route("/get").get(getPosts);
router.route("/current/:id").get(currentPost);
router.route("/delete/:id").delete(deletePost);

export default router;
