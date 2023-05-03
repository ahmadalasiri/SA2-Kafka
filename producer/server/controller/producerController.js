const kafka = require("node-rdkafka");
const asyncHandler = require("express-async-handler");

const Course = require("./course");

const stream = kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`,
  },
  {},
  { topic: "test" }
);

/**
 *  @description Create course
 *  @route       POST /api/v1/courses
 *  @access      Private/instructor
 */
exports.createCourse = asyncHandler(async (req, res) => {
  let course = new Course(req.body, req.method);
  course = JSON.stringify(course);
  const success = stream.write(Buffer.from(course));

  if (success) {
    console.log(JSON.parse(course));
    res.status(200).send("Course created successfully");
  } else {
    res.status(500).send("Error sending message to Kafka");
  }
});

/**
 *  @description Update course
 *  @route       POST /api/v1/courses
 *  @access      Private/instructor
 */
exports.updateCourse = asyncHandler(async (req, res) => {
  req.body.id = req.params.id;
  let course = new Course(req.body, req.method);
  course = JSON.stringify(course);
  const success = stream.write(Buffer.from(course));

  if (success) {
    console.log(JSON.parse(course));
    res.status(200).send("Course updated successfully");
  } else {
    res.status(500).send("Error sending message to Kafka");
  }
});

/**
 *  @description Delete course
 *  @route       POST /api/v1/courses
 *  @access      Private/instructor
 */
exports.deleteCourse = asyncHandler(async (req, res) => {
  req.body.id = req.params.id;
  let course = new Course(req.body, req.method);
  course = JSON.stringify(course);
  const success = stream.write(Buffer.from(course));

  if (success) {
    console.log(JSON.parse(course));
    res.status(204).send();
  } else {
    res.status(500).send("Error sending message to Kafka");
  }
});
