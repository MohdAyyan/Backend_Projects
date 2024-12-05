import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
      
    },
    phone:{
        type:String,
        required:true,
    },
    
    userType:{
        type:String,
        required:true,
        default:"client",
        enum:["client",'admin','vendor','driver']

    },
    profile:{
        type:String,
        default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer:{
        type:String,
        required:true,
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);


export default User;