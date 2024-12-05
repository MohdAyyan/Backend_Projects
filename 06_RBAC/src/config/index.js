import mongoose from "mongoose"
export const ConnectDB = async () => {
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log(`${connect.connection.host} : ${connect.connection.port} - ${connect.connection.name} - Connected`);
        
    } catch (error) {
        console.log("Error in connecting to database",error);
        
    }
}