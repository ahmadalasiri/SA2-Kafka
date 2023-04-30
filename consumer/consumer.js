const Kafka = require("node-rdkafka");
const mongoose = require("mongoose");
const express = require("express");

const globalError = require("./utils/errorMiddleware");
const ApiError = require("./utils/apiError");

// const asyncHandler = require("express-async-handler");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://AhmedElasiri:M!MTgdcikeKVe9V@cluster0.bm3sbni.mongodb.net/SA2?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  code: String,
});

const Course = mongoose.model("Course", courseSchema);

const app = express();
app.use(express.json());

const consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": "192.168.1.4:9092",
  },
  {}
);
consumer.connect();

consumer
  .on("ready", () => {
    console.log("consumer ready...");
    consumer.subscribe(["test"]);
    consumer.consume();
  })
  .on("data", async (data) => {
    const kafkaMass = JSON.parse(data.value);
    console.log("Received message from Kafka:", kafkaMass);
    switch (kafkaMass.action) {
      case "create":
        const Create = async () => {
          const document = await Course.create(kafkaMass.payload);
          console.log("coures created successfully");
        };
        Create();
        break;
      case "delete":
        const Delete = async () => {
          const document = await Course.findByIdAndDelete(kafkaMass.id);
          if (!document) {
            return next(
              new ApiError(`No document for this id ${kafkaMass.id}`, 404)
            );
          }
          console.log("coures deleted successfully");
        };
        Delete();
        break;
      case "update":
        const Update = async () => {
          const document = await Course.findByIdAndUpdate(
            kafkaMass.id,
            kafkaMass.payload,
            { new: true }
          );
          if (!document) {
            return next(
              new ApiError(`No document for this id ${kafkaMass.id}`, 404)
            );
          }
          console.log("coures updated successfully");
        };
        Update();
        break;
      default:
        console.log("Unknown action:", kafkaMass.action);
    }
  });

// Global error handling middleware for express
app.use(globalError);

// Handling error ouside express
process.on("unhandledRejection", (err) => {
  console.log("#".repeat(33));
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});

// app.listen(4000, () => {
//   console.log("Instructor service listening on port 4000");
// });

//==================================================

// const Kafka = require("node-rdkafka");

// var consumer = new Kafka.KafkaConsumer(
//   {
//     "group.id": "kafka",
//     "metadata.broker.list": "192.168.1.4:9092",
//   },
//   {}
// );

// consumer.connect();

// consumer
//   .on("ready", () => {
//     console.log("consumer ready..");
//     consumer.subscribe(["test"]);
//     consumer.consume();
//   })
//   .on("data", function (data) {
//     console.log(`received message: ${data.value}`);
//   });
