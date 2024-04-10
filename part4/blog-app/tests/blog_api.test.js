const { it, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs } = require("./test_helper");
const _ = require("lodash");

const api = supertest(app);

const BLOGS_ENDPOINT = "/api/blogs";

describe("Blog API (initialized with mock data)", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(initialBlogs);
    });

    describe(`GET ${BLOGS_ENDPOINT}`, () => {
        it("returns correct number of blogs as JSON", async () => {
            const response = await api
                .get(BLOGS_ENDPOINT)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.length, initialBlogs.length);
        });

        it("returns blogs with id field", async () => {
            const response = await api.get(BLOGS_ENDPOINT);

            const numBlogs = response.body.length;
            const numWithId = response.body.filter((blog) =>
                _.has(blog, "id")
            ).length;

            assert.strictEqual(numBlogs, numWithId);
        });
    });

    describe(`POST ${BLOGS_ENDPOINT}`, () => {
        it("adds new blog and the blog is found", async () => {
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

        it("sets likes to 0 if omitted", async () => {
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

        it("rejects blog without title", async () => {
            const newBlog = {
                author: "Yours truly",
                url: "https://youwontfindthis.com/",
            };

            await api.post("/api/blogs").send(newBlog).expect(400);

            const result = await api.get("/api/blogs");
            assert.strictEqual(result.body.length, initialBlogs.length);
        });

        it("rejects blog without URL", async () => {
            const newBlog = {
                title: "Svelte is better than React",
                author: "Yours truly",
            };

            await api.post("/api/blogs").send(newBlog).expect(400);

            const result = await api.get("/api/blogs");
            assert.strictEqual(result.body.length, initialBlogs.length);
        });
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
