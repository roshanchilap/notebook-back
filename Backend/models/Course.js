const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: "General" },
  price: { type: String, required: true },
  img: { type: String, required: true },
  date: { type: Date, defaultd: Date.now() },
});

module.exports = mongoose.model("courses", CourseSchema);
