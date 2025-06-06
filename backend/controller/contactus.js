const Response = require("../helper/errHandler");
const contactModel = require("../model/contactModel");

//  Create Contact Data (User)
const Contactus = async (req, res) => {
  try {
    const { firstName, lastName, email, moblie, description } = req.body;

    if (!firstName || !lastName || !email || !moblie || !description) {
      return Response.Error({
        res,
        status: 400,
        message: "Please fill all the fields",
      });
    }

    const contactData = await contactModel.create({
      firstName,
      lastName,
      email,
      moblie,
      description,
    });

    return Response.success({
      res,
      status: 201,
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

//  Delete Contact by ID (Admin)
const contactDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return Response.Error({
        res,
        status: 400,
        message: "Please provide an ID to delete the contact",
      });
    }

    const deletedContact = await contactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      return Response.Error({
        res,
        status: 404,
        message: "Contact not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Contact deleted successfully",
      data: deletedContact,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

//  Get All Contact Data (Admin)
const contactData = async (req, res) => {
  try {
    const getData = await contactModel.find();

    if (!getData || getData.length === 0) {
      return Response.Error({
        res,
        status: 404,
        message: "No contact data found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Contact data fetched successfully",
      data: getData,
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
  Contactus,
  contactDelete,
  contactData,
};
