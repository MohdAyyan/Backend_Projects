import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    if (!userName || !email || !password || !phone || !address || !answer) {
      res.status(400).json({
        message: "Please add all fields",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    });
    const createdUser = await User.findById(user._id).select("-password");

    res.status(201).json({
      message: "User created successfully",
      createdUser,
    });
  } catch (error) {
    console.log("Error in registerUser", error);
    res.status(500).json({
      message: "Error in registerUser",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please add all fields",
      });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
      const loggedInUser = await User.findById(user._id).select("-password");
      res.status(200).json({
        message: "User Login successfully",
        loggedInUser,
        accessToken,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in loginUser",
      error: error.message,
    });
  }
};

export { registerUser, loginUser };
