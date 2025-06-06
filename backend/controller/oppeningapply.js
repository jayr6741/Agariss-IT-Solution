const Response = require("../helper/errHandler");
const OpeningApply = require("../model/openingapply");

//  Apply to Opening (User)
const applyToOpening = async (req, res) => {
  try {
    const { fullName, email, contact_number, position, experience } = req.body;
    const resume = req.file?.filename;
    const resumeUrl = `https://agariss-it-solution.onrender.com/uploads/${resume}`;

    // Field validation
    if (
      !fullName ||
      !email ||
      !contact_number ||
      !position ||
      !experience ||
      !resume
    ) {
      return Response.Error({
        res,
        status: 400,
        message: "All fields including resume are required",
      });
    }

    const application = await OpeningApply.create({
      fullName,
      email,
      contact_number,
      resume: resumeUrl,
      position,
      experience,
    });

    return Response.success({
      res,
      status: 201,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message || "Internal server error",
    });
  }
};

//  Delete Application (Admin)
const deleteOpening = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return Response.Error({
        res,
        status: 400,
        message: "ID is required",
      });
    }

    const deleted = await OpeningApply.findByIdAndDelete(id);

    if (!deleted) {
      return Response.Error({
        res,
        status: 404,
        message: "Application not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Application deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

//  Get All Applications (Admin)
const applyData = async (req, res) => {
  try {
    const applications = await OpeningApply.find();

    if (!applications || applications.length === 0) {
      return Response.Error({
        res,
        status: 404,
        message: "No applications found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Applications fetched successfully",
      data: applications,
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
  applyToOpening,
  applyData,
  deleteOpening,
};
