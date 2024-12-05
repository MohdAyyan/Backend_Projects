import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User get Successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body;
    if (!email || !newpassword || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10); // Await the hashing
    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });
    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      updatedUser,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in reset password User API",
      error,
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      return res.status(400).json({
        // Return after sending response
        success: false,
        msg: "Please provide old and new password",
      });
    }
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({
        // Return after sending response
        success: false,
        msg: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(oldpassword, user.password); // Use bcrypt.compare
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Old password is incorrect, please enter the correct password",
      });
    }
    user.password = await bcrypt.hash(newpassword, 10); // Hash the new password
    await user.save({ validateBeforeSave: false });
    const updatedUser = await User.findById(user._id).select("-password");
    return res.status(200).json({
      // Added return here
      success: true,
      msg: "User password updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      // Added return here
      success: false,
      message: "Error in change password User API",
      msg: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Profile API",
      error,
    });
  }
}

export { getCurrentUser, resetUserPassword, changeUserPassword, deleteUser };
