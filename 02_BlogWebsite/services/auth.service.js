import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secret = "secretkey";

function createToken(user) {
const payload={
    _id:user._id,
    email:user.email,
    username:user.username,
    fullName:user.fullName,
    role:user.role,
    profilePic:user.profilePic
}
 const token = jwt.sign(payload,secret)
 return token
}

function validateToken(token) {
    const payload = jwt.verify(token,secret)
    return payload
}

export{
    createToken,
    validateToken
}