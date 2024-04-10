const { it, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs } = require("./test_helper");
const _ = require("lodash");

const api = supertest(app);

describe("blog api", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(initialBlogs);
    });

    it("should return correct number of blogs", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        assert.strictEqual(response.body.length, initialBlogs.length);
    });

    it("should return blogs with field 'id'", async () => {
        const response = await api.get("/api/blogs");

        const numBlogs = response.body.length;
        const numWithId = response.body.filter((blog) =>
            _.has(blog, "id")
        ).length;

        assert.strictEqual(numBlogs, numWithId);
    });

    it("can add a new blog and the new blog is found", async () => {
        const newBlog = {
            title: "Svelte is better than React",
            author: "Yours truly",
            url: "https://youwontfindthis.com/",
            likes: 999,
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/blogs");

        assert.strictEqual(response.body.length, initialBlogs.length + 1);
        assert(
            _.chain(response.body)
                .map((blog) => _.omit(blog, "id"))
                .some((blog) => _.isEqual(blog, newBlog))
        );
    });

    it("sets likes to 0 if omitted when submitting blog", async () => {
        const newBlog = {
            title: "Svelte is better than React",
            author: "Yours truly",
            url: "https://youwontfindthis.com/",
        };

        const result = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        assert.strictEqual(result.body.likes, 0);
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
