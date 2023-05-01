const express = require("express");
const router = express.Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/producerController");

router.route("/").post(createCourse);
router.route("/:id").put(updateCourse).delete(deleteCourse);

module.exports = router;
