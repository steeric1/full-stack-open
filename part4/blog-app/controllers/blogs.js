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

blogsRouter.delete("/:id", async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id);
    response.status(result ? 204 : 404).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const { likes } = request.body;
    if (!likes) {
        return response.status(400).end();
    }

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
});

module.exports = blogsRouter;
