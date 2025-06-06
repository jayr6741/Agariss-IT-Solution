const mongoose = require("mongoose");
const mongodb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("mongodb is conneted.");
    })
    .catch((err) => {
      console.log("err", err);
    });
};

module.exports = mongodb;
