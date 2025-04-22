
import { Router } from "express";
import { 
  createComment, 
  updateComment, 
  getComments, 
  getCommentsByPostId, 
  getCommentById, 
  deleteComment 
} from "../controllers/comment.controller.js";

const router = Router();

// Create a new comment
router.route("/create").post(createComment);

// Update an existing comment
router.route("/update/:id").put(updateComment);

// Get all comments
router.route("/get").get(getComments);

// Get all comments for a specific post
router.route("/post/:post_id").get(getCommentsByPostId);

// Get a specific comment by ID
router.route("/:id").get(getCommentById);

// Delete a comment
router.route("/delete/:id").delete(deleteComment);

export default router;