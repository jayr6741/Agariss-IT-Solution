const { model, Schema } = require("mongoose");
const contactSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [50, "First name can't exceed 50 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name can't exceed 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  moblie: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number",
    ],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, "Description can't exceed 500 characters"],
  },
});
module.exports = model("contact", contactSchema);
