const { it, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs } = require("./test_helper");

const api = supertest(app);

describe("blog api", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(initialBlogs);
    });

    it("should retrieve correct number of blogs", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        assert.strictEqual(response.body.length, initialBlogs.length);
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
