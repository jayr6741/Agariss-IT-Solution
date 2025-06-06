const Response = require("../helper/errHandler");
const workModel = require("../model/workModel");

//work upload by admin
const creatework = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;
    // const resumeUrl = `https://kesari-a27v.onrender.com/uploads/${image}`;
    if (!image || !title || !description) {
      const obj = {
        res,
        status: 401,
        message: "Please enter title and image",
      };
      return Response.Error(obj);
    }
    const work = await workModel.create({ title, image, description });
    const obj = {
      res,
      status: 200,
      message: "Work data fetched successfully",
      data: work,
    };
    return Response.success(obj);
  } catch (error) {
    const obj = {
      res,
      status: 500,
      message: "Internal Server Error",
    };
    return Response.Error(obj);
  }
};

// work data show by user
const workdata = async (req, res) => {
  try {
    const getData = await workModel.find();
    const obj = {
      res,
      status: 200,
      message: "Work data fetched successfully",
      data: getData,
    };
    return Response.success(obj);
  } catch (error) {
    const obj = {
      res,
      status: 500,
      message: "Internal Server Error",
    };
    return Response.Error(obj);
  }
};
module.exports = { creatework, workdata };
