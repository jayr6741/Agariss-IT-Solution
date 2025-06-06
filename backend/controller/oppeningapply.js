const Response = require("../helper/errHandler");
const OpeningApply = require("../model/openingapply");

const applyToOpening = async (req, res) => {
  try {
    //applycareer by user
    const { fullName, email, contact_number, position, experience } = req.body;
    const resume = req.file?.filename;
    // const resumeUrl = `https://kesari-a27v.onrender.com/uploads/${resume}`;
    const application = await OpeningApply.create({
      fullName,
      email,
      contact_number,
      resume,
      position,
      experience,
    });

    const obj = {
      res,
      status: 200,
      message: "Application submitted successfully",
      data: application,
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

//data get/show by admin
const applyData = async (req, res) => {
  try {
    const getData = await OpeningApply.find();
    if (!getData) {
      const obj = {
        res,
        status: 404,
        message: "applyData not found",
      };
      return Response.Error(obj);
    }
    // console.log('application', getData);
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

module.exports = { applyToOpening, applyData };
