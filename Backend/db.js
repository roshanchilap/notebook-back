const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGOURI;

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to mongo successfully");
  });
};

module.exports = connectToMongo;
