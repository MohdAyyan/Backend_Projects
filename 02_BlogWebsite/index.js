import express from "express";
import path from "path";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import checkAuthCookie from "./middlewares/auth.middleware.js";
import Blog from "./models/blog.model.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/blogwebsite")
  .then((e) => console.log("connected to db"));

app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuthCookie("token"));
app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
