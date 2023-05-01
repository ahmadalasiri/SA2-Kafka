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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// app.post("/api/v1/crud", async (req, res) => {
//   const message = JSON.stringify(req.body);
//   s;

// const stream = kafka.Producer.createWriteStream(
//   {
//     "metadata.broker.list": "192.168.1.4:9092",
//   },
//   {},
//   { topic: "test" }
// );
//   const success = stream.write(Buffer.from(message));

// if (success) {
//   console.log("Message sent to Kafka");
//   res.status(200).send("Message sent to Kafka");
// } else {
//   res.status(500).send("Error sending message to Kafka");
// }
// });

// app.listen(3000, () => {
//   console.log("Instructor service listening on port 3000");
// });

//================================================================================
// const Kafka = require("node-rdkafka");
// const stream = Kafka.Producer.createWriteStream(
//   {
//     "metadata.broker.list": "192.168.1.4:9092",
//   },
//   {},
//   { topic: "test" }
// );

// function queneMessage() {
//   const result = stream.write(Buffer.from("hi"));
//   console.log(result);
// }

// setInterval(() => {
//   queneMessage();
// }, 5000);

//================================================================================
