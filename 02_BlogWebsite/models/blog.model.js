import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
    
},{timestamps:true});

const Blog = mongoose.model("Blog",BlogSchema);

export default Blog;