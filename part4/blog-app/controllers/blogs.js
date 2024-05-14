const jwt = require("jsonwebtoken");

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const user = require("../models/user");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
    response.json(await Blog.find({}).populate("user"));
});

blogsRouter.post("/", async (request, response) => {
    const { body } = request;

    const { id } = jwt.verify(request.token, process.env.SECRET);
    if (!id) {
        return response.status(401).json({ error: "invalid token" });
    }

    const user = await User.findById(id);

    const blog = new Blog({
        user: user._id,
        ...body,
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

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
