const mongoose = require("mongoose");

require("dotenv").config();

const URI =
  "mongodb+srv://admin:admin123@cluster0.osmgt.mongodb.net/LMS?retryWrites=true&w=majority";

const connectToMongo = async () => {
  await mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
