const kafka = require("node-rdkafka");
const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/v1/crud", async (req, res) => {
  const message = JSON.stringify(req.body);

  const stream = kafka.Producer.createWriteStream(
    {
      "metadata.broker.list": "192.168.1.4:9092",
    },
    {},
    { topic: "test" }
  );
  const success = stream.write(Buffer.from(message));

  if (success) {
    console.log("Message sent to Kafka");
    res.status(200).send("Message sent to Kafka");
  } else {
    res.status(500).send("Error sending message to Kafka");
  }
});

app.listen(3000, () => {
  console.log("Instructor service listening on port 3000");
});

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
