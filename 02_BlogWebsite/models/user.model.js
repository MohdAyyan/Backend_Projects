import mongoose, { Schema } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { createToken } from "../services/auth.service.js";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
  },
  salt:{
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  profilePic: {
      type: String,
      default: "./public/images/default.png"
  }
},{timestamps:true});

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    // Generate a random salt
    const salt = randomBytes(16).toString();
    // Create hashed password using salt
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    
    // Replace plain password with hashed password
    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.static("matchPassword",async function (email,password) {
    const user =await this.findOne({email});
    if(!user) throw new Error('User not found !');

    console.log(user);
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvideHash = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(hashedPassword !== userProvideHash){
        throw new Error("Incorrect Password!");
    }
    const token = createToken(user)
    return token;
})


const User = mongoose.model("User", userSchema);

export default User;