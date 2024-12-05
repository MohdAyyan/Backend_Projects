import jwt from "jsonwebtoken"

const verifyToken = async (req,res,next) => {
    try {
       
       let token;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader?.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                req.user = decoded;
                next();
            })
        }else{
            return res.status(401).json({ message: "Unauthorized" });
        }

    } catch (error) {
        console.log(error);
        throw new Error("Token not found")
    }
    
}
export default verifyToken;