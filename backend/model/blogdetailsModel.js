const { model, Schema } = require("mongoose");
const blogDetailSchema = new Schema(
  {
    banner_images: {
      type: String,
    },
    blog_imaage: {
      type: String,
    },
    project: {
      name: String,
      client: String,
      industry: String,
      service: String,
      duration: String,
    },
    clientOverview: {
      type: String,
    },
    objectives: {
      type: [String],
    },
    feature: {
      type: [String],
    },  
     blog_id: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    }
  },
  { timestamps: true }
);

module.exports = model("blogDetailSchema", blogDetailSchema);
