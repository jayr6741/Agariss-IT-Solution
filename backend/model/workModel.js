const mongoose = require("mongoose");
const workSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("workSchema", workSchema);
