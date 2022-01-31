import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 300
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;