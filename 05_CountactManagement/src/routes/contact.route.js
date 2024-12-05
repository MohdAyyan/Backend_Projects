import { Router } from "express";

const router = Router();

import {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

router.use(verifyToken);
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
