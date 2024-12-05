import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const connect=  await mongoose.connect(process.env.MONGO_URI
      );
        console.log(`Connect DB successfully to :${connect.connection.host} ${connect.connection.name}`);
    } catch (error) {
        console.log("Connect DB failed");
        exit(1);
    }

}

export default connectDB;