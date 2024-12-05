import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const user = await User.findOne({ username });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
          id: user._id,
          role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "45min"
        });
        res.status(200).json({ accessToken });
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export{
  registerUser,
  loginUser,
  allUsers
}