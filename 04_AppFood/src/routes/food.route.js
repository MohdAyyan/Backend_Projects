import { Router } from "express";
import { createFood, deleteFood,getAllFood, getFoodById , updateFood, orderStatusController } from "../controllers/food.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js"; 
import verifyAdmin from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/createFood").post(verifyJWT,createFood);
router.route("/getFoods").get(verifyJWT,getAllFood);
router.route("/getFood/:id").get(verifyJWT,getFoodById);
router.route("/updateFood/:id").put(verifyJWT,updateFood);
router.route("/deleteFood/:id").delete(verifyJWT,deleteFood);
router.post("/orderStatus/:id", verifyAdmin, orderStatusController);
export default router;
