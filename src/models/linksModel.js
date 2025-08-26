
import mongoose from "mongoose";
import User from "./userModel.js";
const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "please provide the link"],
  },
  title: {
    type: String,
    required: [true, "please provide your title"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notes: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);
export default Link;