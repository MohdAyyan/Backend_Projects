import verifyToken from "../middlewares/auth.middleware.js"
import { Router } from "express"
import { authorizeRoles } from "../middlewares/role.middleware.js"

const router = Router()

router.route("/admin").get(verifyToken, authorizeRoles("admin") ,(req, res) => {
    res.status(200).json({ message: "Welcome Admin" })
})
router.route("/manager").get(verifyToken,authorizeRoles("admin","manager"),(req, res) => {
    res.status(200).json({ message: "Welcome Manager" })
})
router.route("/user").get(verifyToken,authorizeRoles("admin","manager","user"),(req, res) => {
    res.status(200).json({ message: "Welcome User" })
})

export default router