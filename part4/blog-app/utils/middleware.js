const logger = require("./logger");

const errorHandler = (err, request, response, next) => {
    if (process.env.NODE_ENV !== "test") logger.error(err);

    const messages = {
        CastError: "malformed id",
        ValidationError: err.message,
        JsonWebTokenError: "missing or invalid token",
    };

    if (messages[err.name])
        return response.status(400).send({ error: messages[err.name] });

    next(err);
};

module.exports = {
    errorHandler,
};
