const blogsRouter = require("express").Router();
const mongoose = require("mongoose");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    response.json(await Blog.find({}));
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);

    try {
        const result = await blog.save();
        response.status(201).json(result);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            response.status(400).end();
        } else {
            response.status(500).end();
        }
    }
});

blogsRouter.delete("/:id", async (request, response) => {
    try {
        const result = await Blog.findByIdAndDelete(request.params.id);
        response.status(result ? 204 : 404).end();
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            response.status(400).end();
        } else {
            response.status(500).end();
        }
    }
});

blogsRouter.put("/:id", async (request, response) => {
    const { likes } = request.body;
    if (!likes) {
        return response.status(400).end();
    }

    try {
        const result = await Blog.findByIdAndUpdate(
            request.params.id,
            { likes },
            { new: true }
        );

        if (result) {
            response.json(result);
        } else {
            response.status(404).end();
        }
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            response.status(400).end();
        } else {
            response.status(500).end();
        }
    }
});

module.exports = blogsRouter;
