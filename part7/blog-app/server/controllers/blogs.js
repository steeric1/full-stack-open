const mongoose = require("mongoose");

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    response.json(await Blog.find({}).populate("user", { blogs: 0 }));
});

blogsRouter.post("/", async (request, response) => {
    const { body, user } = request;
    if (!user) {
        return response.status(401).json({ error: "not authenticated" });
    }

    const blog = new Blog({
        user: user._id,
        ...body,
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response
        .status(201)
        .json(await Blog.findById(result._id).populate("user", { blogs: 0 }));
});

blogsRouter.delete("/:id", async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.status(401).json({ error: "not authenticated" });
    }

    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
        return response.status(404).end();
    }

    if (blog.user && blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(blogId);
        response.status(204).end();
    } else {
        response.status(403).json({ error: "not authorized" });
    }
});

blogsRouter.put("/:id", async (request, response) => {
    const { likes } = request.body;
    if (!likes) {
        return response.status(400).end();
    }

    const result = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes },
        { new: true },
    ).populate("user", { blogs: 0 });

    if (result) {
        response.json(result);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post("/:id/comments", async (request, response) => {
    const { content } = request.body;
    if (!content) {
        return response.status(400).end();
    }

    const id = request.params.id;
    const blog = await Blog.findById(id);
    if (blog) {
        const result = await Blog.findByIdAndUpdate(
            id,
            {
                comments: blog.comments.concat({
                    content,
                }),
            },
            { new: true },
        );
        response.json(result);
    } else {
        response.status(404).end();
    }
});

module.exports = blogsRouter;
