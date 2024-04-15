const express = require("express");
require("express-async-errors");

const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const { errorHandler } = require("./utils/middleware");

// Connect to MongoDB
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error while connecting to MongoDB:", error.message);
    });

// Create application
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(errorHandler);

module.exports = app;
