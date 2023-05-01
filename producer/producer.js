const path = require("path");

const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const ApiError = require("./server/utils/apiError");
const globalError = require("./server/middleware/errorMiddleware");

// express app
const app = express();

// Middlewares
app.use(express.json());

// Routes
const coursesRouter = require("./server/routes/courseRoute");

// Mount Routes
app.use("/api/v1/courses", coursesRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

// Handling error ouside express
process.on("unhandledRejection", (err) => {
  console.log("#".repeat(33));
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});
