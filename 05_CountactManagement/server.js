import express from "express";

import dotenv from "dotenv";
dotenv.config({
  path: "./.env"
});


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

import { errorHandler } from "./src/middlewares/errorHandler.js";
import { connectDB } from "./src/config/connDB.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(errorHandler);

import ContactRoute from "./src/routes/contact.route.js";
import UsersRoute from "./src/routes/user.route.js";
app.use("/api/v1/contacts", ContactRoute);
app.use("/api/v1/users", UsersRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})