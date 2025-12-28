import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
    minLength: [3, "Min 3 chars"],
    maxLength: [30, "Max 30 chars"],
  },
  description: {
    type: String,
    required: [true, "Description required"],
    minLength: [10, "Min 10 chars"],
    maxLength: [500, "Max 500 chars"],
  },
  category: {
    type: String,
    required: [true, "Category required"],
  },
  country: {
    type: String,
    required: [true, "Country required"],
  },
  city: {
    type: String,
    required: [true, "City required"],
  },
  location: {
    type: String,
    required: [true, "Location required"],
    minLength: [20, "Min 20 chars"],
  },
  fixedSalary: Number,
  salaryFrom: Number,
  salaryTo: Number,
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
