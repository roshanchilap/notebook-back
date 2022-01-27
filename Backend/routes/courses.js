const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Course = require("../models/Course");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
router.get("/fetchallcourses", fetchuser, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id });
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addcourse",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("price", "Price must be 3 digits").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag, price, img } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const course = new Course({
        title,
        description,
        tag,
        user: req.user.id,
        price,
        img,
      });
      const savedCourse = await course.save();

      res.json(savedCourse);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatecourse/:id", fetchuser, async (req, res) => {
  const { title, description, tag, price, img } = req.body;
  try {
    // Create a newNote object
    const newCourse = {};
    if (title) {
      newCourse.title = title;
    }
    if (description) {
      newCourse.description = description;
    }
    if (tag) {
      newCourse.tag = tag;
    }
    if (price) {
      newCourse.price = price;
    }
    if (img) {
      newCourse.img = img;
    }

    // Find the note to be updated and update it
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send("Not Found");
    }

    if (course.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: newCourse },
      { new: true }
    );
    res.json({ course });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletecourse/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (course.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    course = await Course.findByIdAndDelete(req.params.id);
    res.json({ Success: "Course has been deleted", course: course });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
