import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import ConnectDB from "./config/connectdb.js"

ConnectDB()


const app = express()
const PORT = process.env.PORT || 7000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import restaurantRoute from "./routes/restaurant.route.js"
import categoryRoute from "./routes/category.route.js"
import foodRoute from "./routes/food.route.js"

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/restaurant",restaurantRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/food",foodRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
