const Response = require("../helper/errHandler");
const blogModel = require("../model/blogdetailsModel");
const blogschema = require("../model/blog");
//blogcard  create by admin
const blogs = async (req, res) => {
  try {
    // const resumeUrl = `https://kesari-a27v.onrender.com/uploads/${image}`;
    const { blog_title, date, blog_name } = req.body;
    const blog_image = req.file?.filename;
    const blog = await blogschema.create({
      blog_image,
      blog_title,
      date,
      blog_name,
    });

    if (!blog) {
      const obj = {
        res,
        status: 404,
        message: "data is not found",
      };
      return Response.Error(obj);
    }
    const obj = {
      res,
      status: 200,
      message: "Requst successFully",
      data: blog,
    };
    return Response.success(obj);
  } catch (error) {
    const obj = {
      res,
      status: 500,
      message: error.message,
    };
    return Response.Error(obj);
  }
};

//blogdetails create admin
const createblog = async (req, res) => {
  try {
    const { project, clientOverview, objectives, feature } = req.body;
    const banner_images = req.files?.filename;
    const blog_image = req.files?.filename;
    // const imageurl = `https://kesari-a27v.onrender.com/uploads/${banner_images}`;
    // const imageurl1 = `https://kesari-a27v.onrender.com/uploads/${blog_image}`;
    const Blog = await blogModel.create({
      banner_images,
      blog_image,
      project: JSON.parse(project),
      clientOverview,
      objectives,
      feature,
    });

    if (!Blog) {
      const obj = {
        res,
        status: 404,
        message: "Blog not created",
      };
      return Response.Error(obj);
    }

    const obj = {
      res,
      status: 201,
      message: "Blog created successfully",
      data: Blog,
    };
    return Response.success(obj);
  } catch (error) {
    const obj = {
      res,
      status: 500,
      message: error.message,
    };
    return Response.Error(obj);
  }
};

//blog data show by user
const getdetailsblog = async (req, res) => {
  try {
    const getdata = await blogModel
      .findOne({ _id: req.params.id })
      .populate("blog_id");

    console.log("getdata", getdata);

    if (!getdata) {
      const obj = {
        res,
        status: 404,
        message: "Data not found",
      };
      return Response.Error(obj);
    }

    const obj = {
      res,
      status: 200,
      message: "Data fetched successfully",
      data: getdata,
    };
    return Response.success(obj);
  } catch (error) {
    const obj = {
      res,
      status: 500,
      message: error.message,
    };
    return Response.Error(obj);
  }
};
module.exports = { createblog, blogs, getdetailsblog };
