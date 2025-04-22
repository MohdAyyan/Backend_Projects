import prisma from "../DB/db.config.js";

const createPost = async (req, res) => {
  try {
    const { user_id, title, description } = req.body;
    
    if (!title ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    
    const newPost = await prisma.post.create({
        data: {
           user_id: Number(user_id),
            title,
            description
        }
    })
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updatePost = async (req, res) => {
  try {
    // Extract id from req.params
    const { id } = req.params;
    const { title, description } = req.body;
    
    // Convert string id to integer for Prisma
    const postId = parseInt(id);
    
    // Validate id is a number
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }
    
    const post = await prisma.post.update({
      where: {
        id: postId  // Now passing a number, not an object
      },
      data: {
        title,
        description,
      },
    });
    
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({ message: "Posts retrieved successfully", posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const currentPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Convert string id to integer for Prisma
    const postId = parseInt(id);
    
    // Validate id is a number
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }
    
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.status(200).json({ message: "Post retrieved successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);
    
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }
    
    const post = await prisma.post.delete({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
     createPost,
     updatePost,
     getPosts,
     currentPost,
     deletePost
};
