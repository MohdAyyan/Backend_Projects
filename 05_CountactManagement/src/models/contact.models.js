import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
},{timestamps:true})

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;