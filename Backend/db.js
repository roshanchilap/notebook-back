const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://admin:admin123@cluster0.769av.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to mongo successfully");
  });
};

module.exports = connectToMongo;
