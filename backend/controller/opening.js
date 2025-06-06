const Response = require("../helper/errHandler");
const openingModel = require("../model/openingModel");

//opening data add  by admin

const createOpening = async (req, res) => {
  try {
    const { title, jobtype, requirement } = req.body;
    const newOpening = await openingModel.create({
      title,
      jobtype,
      requirement,
    });

    if (!newOpening) {
      return Response.Error({
        res,
        status: 404,
        message: "Opening not created",
      });
    }
    return Response.success({
      res,
      status: 200,
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

//opening data show by user
const openingData = async (req, res) => {
  try {
    const getData = await openingModel.find();
    if (!getData) {
      const obj = {
        res,
        status: 404,
        message: "opening not found",
      };
      return Response.Error(obj);
    }
    const obj = {
      res,
      status: 200,
      message: "requst successFully",
      data: getData,
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
module.exports = { createOpening, openingData };
