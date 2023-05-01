const express = require("express");
const router = express.Router();

const { getCourses, getCourse } = require("../controller/courseController");

router.route("/").get(getCourses);
router.route("/:id").get(getCourse);

module.exports = router;
