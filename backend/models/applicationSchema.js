import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
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
  coverLetter: {
    type: String,
    required: [true, "Cover letter required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone required"],
  },
  address: {
    type: String,
    required: [true, "Address required"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
