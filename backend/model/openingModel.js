const mongoose = require("mongoose");
const openingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      minlength: [3, "Job title must be at least 3 characters long"],
      maxlength: [100, "Job title can't exceed 100 characters"],
      trim: true,
    },
    jobtype: {
      type: String,
      required: [true, "Job type is required"],
      trim: true,
    },
    requirement: {
      type: String,
      required: [true, "Requirement is required"],
      minlength: [10, "Requirement must be at least 10 characters long"],
      maxlength: [1000, "Requirement can't exceed 1000 characters"],
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("opening", openingSchema);
