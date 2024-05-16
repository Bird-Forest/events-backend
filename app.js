const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const eventsRouter = require("./routes/api/events");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found, app" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log("END APP MESS", message);
  console.log("END APP", err);
  res.status(status).json({ message });
});

module.exports = app;
