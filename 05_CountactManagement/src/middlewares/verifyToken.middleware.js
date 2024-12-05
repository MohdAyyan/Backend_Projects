import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

/* This code snippet defines a function named `verifyToken` that is exported as a constant. The
function is an asynchronous handler that takes three parameters: `req` (request), `res` (response),
and `next` (next middleware function). */
export const verifyToken = AsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization ;
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
})