const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    response.json(await Blog.find({}));
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);
    const result = await blog.save();

    response.status(201).json(result);
});

module.exports = blogsRouter;
