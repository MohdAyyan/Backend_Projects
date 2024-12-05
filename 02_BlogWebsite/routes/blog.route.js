import { Router } from "express";
import multer from "multer";
import Blog from "../models/blog.model.js";
import path from "path";
import Comment from "../models/comment.modal.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null,fileName);
    }
}) 
  
  const upload = multer({ storage: storage })



router.get("/add-new", (req, res) => {
  res.render("addBlog",{
    user : req.user
  });
});


router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");
    res.render("blog", {
        blog,
        user: req.user,
        comments
    });
})

router.post("/comment/:blogId", async (req, res) => {
    const comment = await Comment.create({
      content:req.body.content,
      createdBy: req.user._id,
      blogId: req.params.blogId
    })
    return res.redirect(`/blog/${req.params.blogId}`)
}
)


router.post("/", upload.single("coverImage"),async (req, res) => {
    
    const { title, body} = req.body;
   const blog=  await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: `/uploads/${req.file.filename}`,
    })
    return res.redirect(`/blog/${blog._id}`);
})

export default router;
