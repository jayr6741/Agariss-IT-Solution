const mongoose = require("mongoose");

const OpeningapplySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name can't exceed 100 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    contact_number: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number",
      ],
    },
    resume: {
      type: String,
      required: [true, "Resume file is required"],
    },
    position: {
      type: String,
      required: [true, "Position applied for is required"],
      trim: true,
      maxlength: [100, "Position can't exceed 100 characters"],
    },
    experience: {
      type: String,
      trim: true,
      maxlength: [50, "Experience can't exceed 50 characters"],
    },
    openingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opening",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OpeningApply", OpeningapplySchema);
