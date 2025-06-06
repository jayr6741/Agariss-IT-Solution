const Response = require("../helper/errHandler");
const openingModel = require("../model/openingModel");

//  Create Job Opening (Admin)
const createOpening = async (req, res) => {
  try {
    const { title, jobtype, requirement } = req.body;

    if (!title || !jobtype || !requirement) {
      return Response.Error({
        res,
        status: 400,
        message: "Please fill all the fields",
      });
    }

    const newOpening = await openingModel.create({ title, jobtype, requirement });

    return Response.success({
      res,
      status: 201,
      message: "Opening created successfully",
      data: newOpening,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message || "Internal server error",
    });
  }
};

//  Delete Job Opening by ID (Admin)
const deleteOpening = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return Response.Error({
        res,
        status: 400,
        message: "Please provide a valid ID",
      });
    }

    const deletedData = await openingModel.findByIdAndDelete(id);

    if (!deletedData) {
      return Response.Error({
        res,
        status: 404,
        message: "Opening not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Opening deleted successfully",
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

//  Get All Openings (User)
const openingData = async (req, res) => {
  try {
    const data = await openingModel.find();

    if (!data || data.length === 0) {
      return Response.Error({
        res,
        status: 404,
        message: "No openings found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Openings fetched successfully",
      data,
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
  createOpening,
  deleteOpening,
  openingData,
};
