const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    blog_image: {
      type: String,
      required: true,
    },
    blog_title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    blog_name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true}
);
module.exports = mongoose.model("blog",blogSchema);
