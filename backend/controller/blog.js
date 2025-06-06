const Response = require("../helper/errHandler");
const blogModel = require("../model/blogdetailsModel");
const blogSchema = require("../model/blog");

//  Create Blog Card (Admin)
const createBlog = async (req, res) => {
  try {
    const { blog_title, date, blog_name } = req.body;
    const blog_image = req.file?.filename;
    const imageUrl = `https://agariss-it-solution.onrender.com/uploads/${blog_image}`;

    if (!blog_title || !date || !blog_name || !blog_image) {
      return Response.Error({
        res,
        status: 400,
        message: "All fields are required.",
      });
    }

    const blog = await blogSchema.create({
      blog_image: imageUrl,
      blog_title,
      date,
      blog_name,
    });

    return Response.success({
      res,
      status: 201,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

//  Update Blog Card (Admin)
const updateBlog = async (req, res) => {
  try {
    const { blog_title, date, blog_name } = req.body;
    const blog_image = req.file?.filename;
    const imageUrl = `https://agariss-it-solution.onrender.com/uploads/${blog_image}`;
    const updatedBlog = await blogSchema.findByIdAndUpdate(
      req.params.id,
      {
        blog_title,
        date,
        blog_name,
        blog_image: imageUrl,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return Response.Error({
        res,
        status: 404,
        message: "Blog not found for update",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

//  Delete Blog Card (Admin)
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await blogSchema.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return Response.Error({
        res,
        status: 404,
        message: "Blog not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

//  Create Blog Details (Admin)
const createBlogDetails = async (req, res) => {
  try {
    const { project, clientOverview, objectives, feature } = req.body;

    const banner_images = req.files?.banner_images?.[0]?.filename;
    const blog_image =
      req.files?.blog_imaage?.map((file) => file.filename) || [];
    const imageUrl = `https://agariss-it-solution.onrender.com/uploads/${banner_images}`;
    const imageUrl1 = `https://agariss-it-solution.onrender.com/uploads/${blog_image}`;

    if (
      !project ||
      !clientOverview ||
      !objectives ||
      !feature ||
      !banner_images ||
      !blog_image.length
    ) {
      return Response.Error({
        res,
        status: 400,
        message: "All fields and images are required.",
      });
    }

    const Blog = await blogModel.create({
      banner_images: imageUrl,
      blog_image: imageUrl1,
      project: JSON.parse(project),
      clientOverview,
      objectives,
      feature,
    });

    return Response.success({
      res,
      status: 201,
      message: "Blog details created successfully",
      data: Blog,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

//  Delete Blog Details (Admin)
const deleteBlogDetails = async (req, res) => {
  try {
    const deletedData = await blogModel.findByIdAndDelete(req.params.id);

    if (!deletedData) {
      return Response.Error({
        res,
        status: 404,
        message: "Blog details not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Blog details deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};
//  Get Blog Details (User)

const getBlogDetails = async (req, res) => {
  try {
    const blogDetails = await blogModel.findById(req.params.id);
    if (!blogDetails) {
      return Response.Error({
        res,
        status: 404,
        message: "Blog details not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Blog details fetched successfully",
      data: blogDetails,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

//  Get All Blogs (User)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogSchema.find();

    return Response.success({
      res,
      status: 200,
      message: "All blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  createBlogDetails,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogDetails,
  getAllBlogs,
  deleteBlogDetails,
};
