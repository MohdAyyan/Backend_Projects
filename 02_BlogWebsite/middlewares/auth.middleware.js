import { validateToken } from "../services/auth.service.js";

function checkAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookieName];
        if (!tokenCookie) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookie);
            req.user = userPayload;
            next();
        } catch (error) {
            next(error);
        }
    };
}

export default checkAuthCookie; 