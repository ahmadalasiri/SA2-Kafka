const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const ApiError = require("../utils/apiError");
/**
 *  @description Get list of Courses
 *  @route       GET /api/v1/courses
 *  @access      Public
 */
exports.getCourses = asyncHandler(async (req, res) => {
  const course = await Course.find();

  res.status(200).json({
    results: course.length,
    data: course,
  });
});

/**
 *  @description Get   Course
 *  @route       GET /api/v1/courses
 *  @access      Public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return next(
      new ApiError(`There is no course for this id ${req.params.id}`)
    );
  res.status(200).json({
    course,
  });
});
