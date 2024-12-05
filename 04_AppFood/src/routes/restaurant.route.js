import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createRestaurant, getAllRestaurant, getRestaurantById, deleteRestaurant } from "../controllers/resturant.controller.js";

const router = Router();

router.route("/create").post(verifyJWT,createRestaurant);
router.route("/allRestaurants").get(getAllRestaurant);
router.route("/getRestaurant/:id").get(getRestaurantById);
router.route("/deleteRestaurant/:id").delete(deleteRestaurant);


export default router;