import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    // Check if authorization header is present
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authorization token provided",
      });
    }

    // get token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Invalid Auth Token",
      error,
    });
  }
};


export default verifyJWT;
