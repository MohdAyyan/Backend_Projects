import { createCategory, getALlCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/createcategory").post(verifyJWT, createCategory);
router.route("/getallcategories").get(getALlCategories);
router.route("/updatecategory/:id").put(verifyJWT, updateCategory);
router.route("/deletecategory/:id").delete(verifyJWT,getALlCategories);

export default router; 
