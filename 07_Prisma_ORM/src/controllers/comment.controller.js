import prisma from "../DB/db.config.js";

const createComment = async (req, res) => {
  try {
    const { user_id, post_id, comment } = req.body;
    
    if (!comment || !user_id || !post_id) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // First, increment the post's comment_count
    await prisma.post.update({
      where: { 
        id: Number(post_id) 
      },
      data: { 
        comment_count: { 
          increment: 1 
        } 
      }
    });
    
    const newComment = await prisma.comment.create({
        data: {
           user_id: Number(user_id),
           post_id: Number(post_id),
           comment
        }
    });
    
    res.status(201).json({ message: "Comment created successfully", newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    
    if (!comment) {
      return res
        .status(400)
        .json({ message: "Comment content is required" });
    }
    
    const updatedComment = await prisma.comment.update({
      where: {
        id: id // Comment ID is a string (UUID)
      },
      data: {
        comment
      },
    });
    
    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    
    res.status(200).json({ message: "Comments retrieved successfully", comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    
    if (!post_id) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    
    const postIdNum = Number(post_id);
    
    if (isNaN(postIdNum)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }
    
    const comments = await prisma.comment.findMany({
      where: { 
        post_id: postIdNum 
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json({ message: "Comments retrieved successfully", comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "Comment ID is required" });
    }
    
    const comment = await prisma.comment.findUnique({
      where: { 
        id: id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        post: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    });
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    res.status(200).json({ message: "Comment retrieved successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "Comment ID is required" });
    }
    
    // First find the comment to get the post_id
    const comment = await prisma.comment.findUnique({
      where: { 
        id: id 
      }
    });
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    // Delete the comment
    await prisma.comment.delete({
      where: { 
        id: id 
      }
    });
    
    // Decrement the post's comment_count
    await prisma.post.update({
      where: { 
        id: comment.post_id 
      },
      data: { 
        comment_count: { 
          decrement: 1 
        } 
      }
    });
    
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createComment,
  updateComment,
  getComments,
  getCommentsByPostId,
  getCommentById,
  deleteComment
};