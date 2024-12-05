import User from "../models/user.model.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin ACess ",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-AUthorized ACCESS",
      error,
    });
  }
};

export default verifyAdmin;