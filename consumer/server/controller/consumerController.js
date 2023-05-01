const Kafka = require("node-rdkafka");
const Course = require("../models/courseModel");

const cudOpetation = () => {
  const consumer = new Kafka.KafkaConsumer(
    {
      "group.id": "kafka",
      "metadata.broker.list": `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`,
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

      switch (kafkaMass.method) {
        case "POST":
          createCourse(kafkaMass);
          break;
        case "DELETE":
          deleteCourse(kafkaMass);
          break;
        case "PUT":
          updateCourse(kafkaMass);
          break;
        default:
          console.log("Unknown action:", kafkaMass.action);
      }
    });
};

const createCourse = async (kafkaMass) => {
  try {
    const Create = async () => {
      const course = await Course.create({
        name: kafkaMass.name,
        code: kafkaMass.code,
        active: kafkaMass.active,
      });
      console.log("course created successfully");
    };
    await Create();
  } catch (error) {
    console.error("Error creating course:", error);
  }
};

const deleteCourse = async (kafkaMass) => {
  try {
    const Delete = async () => {
      const course = await Course.findByIdAndDelete(kafkaMass.id);
      if (!course) {
        throw new Error(`There is no course for this id  ${kafkaMass.id}`);
      }
      console.log("course deleted successfully");
    };
    await Delete();
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};

const updateCourse = async (kafkaMass) => {
  try {
    const Update = async (req, res) => {
      const course = await Course.findByIdAndUpdate(
        kafkaMass.id,
        {
          name: kafkaMass.name,
          code: kafkaMass.code,
          active: kafkaMass.active,
        },
        { new: true }
      );
      if (!course) {
        throw new Error(`There is no course for this id  ${kafkaMass.id}`);
      }
      console.log("course updated successfully");
    };
    await Update();
  } catch (error) {
    console.error("Error updating course:", error);
  }
};

module.exports = cudOpetation;
