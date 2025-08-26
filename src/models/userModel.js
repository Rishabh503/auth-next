import mongoose from "mongoose";
import Link from "./linksModel";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide your username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide your username"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
});

// react practice

// const User=mongoose.model("users",userSchema)

// export default User

// so its like nextjs works on edge browsing
// so it doesnt whether the connection is maiden or already exists
//  so we  check if it exists or not
// and create if it doesnt and return the older if it does

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

