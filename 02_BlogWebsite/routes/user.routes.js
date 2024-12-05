import { Router } from "express";
import User from "../models/user.model.js";
const router = Router();

router.get("/signin", (req, res) => {
    res.render("signin");
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.post("/signin", async (req, res) => {

    const { email, password } = req.body;

    try {

        const token = await User.matchPassword(email, password)
        return res.cookie("token", token, { httpOnly: true }).redirect("/")

    } catch (error) {
        return res.status(500).render("signin", { error: "Invalid Credentials" })
    }
})


router.post("/signup", async (req, res) => {

    const { fullName, email, password } = req.body;
    const user = await User.create({
        fullName,
        email,
        password
    })

    return res.redirect("/")

})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})

export default router;


