const Response = require("../helper/errHandler");
const workModel = require("../model/workModel");

//  Create Work (Admin)
const creatework = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;
    const imageUrl = `https://agariss-it-solution.onrender.com/uploads/${image}`;

    if (!title || !description || !image) {
      return Response.Error({
        res,
        status: 400,
        message: "Please fill in all fields including image",
      });
    }

    const work = await workModel.create({
      title,
      image:imageUrl,
      description,
    });

    return Response.success({
      res,
      status: 201,
      message: "Work created successfully",
      data: work,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

//  Delete Work (Admin)
const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return Response.Error({
        res,
        status: 400,
        message: "Work ID is required",
      });
    }

    const deletedData = await workModel.findByIdAndDelete(id);

    if (!deletedData) {
      return Response.Error({
        res,
        status: 404,
        message: "Work not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Work deleted successfully",
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

//  Get All Work Data (User)
const workdata = async (req, res) => {
  try {
    const data = await workModel.find();

    if (!data || data.length === 0) {
      return Response.Error({
        res,
        status: 404,
        message: "No work data found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Work data fetched successfully",
      data,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  creatework,
  workdata,
  deleteWork,
};
