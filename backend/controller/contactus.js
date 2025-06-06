const Response = require("../helper/errHandler");
const contactModel = require("../model/contactModel");


//contact data create by user
const Contactus = async (req, res) => {
  try {
    const { firstName, lastName, email, moblie, description } = req.body;
    const contactData = await contactModel.create({
      firstName,
      lastName,
      email,
      moblie,
      description,
    });

    if (!contactData) {
      return Response.Error({
        res,
        status: 404,
        message: "Contact was not created",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Contact created successfully",
      data: contactData,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message || "Something went wrong",
    });
  }
};


//contact data show by admin
const contactData = async (req, res) => {
  try {
    const getData = await contactModel.find();
    if (!getData) {
      const obj = {
        res,
        status: 404,
        message: "contact not found",
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
module.exports = { Contactus, contactData };
