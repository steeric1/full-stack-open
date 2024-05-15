const express = require("express");
require("express-async-errors");

const cors = require("cors");
const mongoose = require("mongoose");

const { blogsRouter, usersRouter, loginRouter } = require("./controllers");
const { config, logger, middleware } = require("./utils");

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
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
