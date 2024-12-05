import express from "express"

import { ConnectDB } from "./config/index.js"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

ConnectDB();

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended:true}))

import  authRouter  from "./routes/auth.route.js"
import  userRouter  from "./routes/user.route.js"

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)

app.listen(PORT,(req,res)=>{
console.log(`Server running on port :${PORT}`);

})