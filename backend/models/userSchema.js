import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    minLength: [3, "Min 3 chars"],
    maxLength: [30, "Max 30 chars"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    validate: [validator.isEmail, "Invalid email"],
  },
  phone: {
    type: Number,
    required: [true, "Phone required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minLength: [8, "Min 8 chars"],
    maxLength: [32, "Max 32 chars"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Role required"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);

