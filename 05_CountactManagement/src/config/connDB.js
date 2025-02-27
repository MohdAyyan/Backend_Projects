import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection= await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected",connection.connection.host,connection.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}