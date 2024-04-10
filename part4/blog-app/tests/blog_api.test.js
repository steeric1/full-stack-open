const { it, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, nonExistentBlogId } = require("./test_helper");
const _ = require("lodash");

const api = supertest(app);

const BLOGS_ENDPOINT = "/api/blogs";
const getBlogs = () => api.get(BLOGS_ENDPOINT);
const postBlog = (body) => api.post(BLOGS_ENDPOINT).send(body);
const deleteBlog = (id) => api.delete(`${BLOGS_ENDPOINT}/${id}`);
const updateBlogLikes = (id, likes) =>
    api.put(`${BLOGS_ENDPOINT}/${id}`).send({ likes });

describe("Blog API (initialized with mock data)", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(initialBlogs);
    });

    describe(`GET ${BLOGS_ENDPOINT}`, () => {
        it("returns correct number of blogs as JSON", async () => {
            const response = await getBlogs()
                .expect(200)
                .expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.length, initialBlogs.length);
        });

        it("returns blogs with id field", async () => {
            const response = await getBlogs();

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

            await postBlog(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const response = await getBlogs();

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

            const response = await postBlog(newBlog)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.likes, 0);
        });

        it("rejects blog without title", async () => {
            const newBlog = {
                author: "Yours truly",
                url: "https://youwontfindthis.com/",
            };

            await postBlog(newBlog).expect(400);

            const response = await getBlogs();
            assert.strictEqual(response.body.length, initialBlogs.length);
        });

        it("rejects blog without URL", async () => {
            const newBlog = {
                title: "Svelte is better than React",
                author: "Yours truly",
            };

            await postBlog(newBlog).expect(400);

            const response = await api.get("/api/blogs");
            assert.strictEqual(response.body.length, initialBlogs.length);
        });
    });

    describe(`DELETE ${BLOGS_ENDPOINT}/:id`, () => {
        it("rejects invalid id and doesn't delete", async () => {
            await deleteBlog("invalid-id").expect(400);

            const response = await getBlogs();
            assert.strictEqual(response.body.length, initialBlogs.length);
        });

        it("doesn't delete with non-existent id", async () => {
            const id = await nonExistentBlogId();
            await deleteBlog(id).expect(204);

            const respose = await getBlogs();
            assert.strictEqual(respose.body.length, initialBlogs.length);
        });

        it("deletes blog with correct id", async () => {
            const newBlog = {
                title: "Svelte is better than React",
                author: "Yours truly",
                url: "https://youwontfindthis.com/",
            };

            const id = (await postBlog(newBlog)).body.id;
            await deleteBlog(id).expect(204);

            const response = await getBlogs();
            assert.strictEqual(response.body.length, initialBlogs.length);
            assert(!response.body.some((blog) => blog.id === id));
        });
    });

    describe(`PUT ${BLOGS_ENDPOINT}/:id`, () => {
        it("rejects invalid id and doesn't update anything", async () => {
            await updateBlogLikes("invalid-id", 999).expect(400);

            const response = await getBlogs();
            _.chain(response.body)
                .map((blog) => _.omit(blog, "id"))
                .each((blog, idx) =>
                    assert.deepStrictEqual(blog, initialBlogs[idx])
                );
        });

        it("doesn't update with non-existent id and returns 404", async () => {
            const id = await nonExistentBlogId();
            await updateBlogLikes(id, 999).expect(404);

            const response = await getBlogs();
            _.chain(response.body)
                .map((blog) => _.omit(blog, "id"))
                .each((blog, idx) =>
                    assert.deepStrictEqual(blog, initialBlogs[idx])
                );
        });

        it("updates blog likes with correct id and responds with updated JSON", async () => {
            const blogs = (await getBlogs()).body;
            const { id } = blogs[0];

            let response = await updateBlogLikes(id, 123)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.likes, 123);

            response = await getBlogs();
            let likes = response.body.find((blog) => blog.id === id).likes;

            assert.strictEqual(likes, 123);
        });
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
