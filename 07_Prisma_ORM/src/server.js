import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();


// Apply middleware before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);


app.listen(process.env.PORT || 7002, () => {
  console.log(`Server is running on port ${process.env.PORT || 7002}`);
});