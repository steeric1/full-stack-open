const { test, describe } = require("node:test");
const assert = require("node:assert");
const _ = require("lodash");

const listHelper = require("../utils/list_helper");
const { initialBlogs } = require("./test_helper");

describe("total likes", () => {
    test("of an empty list equals zero", () => {
        assert.strictEqual(listHelper.totalLikes([]), 0);
    });

    test("of a list with one blog equals likes of the singular blog", () => {
        assert.strictEqual(
            listHelper.totalLikes([initialBlogs[0]]),
            initialBlogs[0].likes
        );
    });

    test("of a bigger list is calculated correctly", () => {
        let likes = 0;
        initialBlogs.forEach((blog) => (likes += blog.likes));

        assert.strictEqual(listHelper.totalLikes(initialBlogs), likes);
    });
});

describe("favorite blog", () => {
    test("of an empty list is null", () => {
        assert.strictEqual(listHelper.favoriteBlog([]), null);
    });

    test("of a list with one blog is that blog", () => {
        assert.deepStrictEqual(
            listHelper.favoriteBlog([initialBlogs[0]]),
            _.pick(initialBlogs[0], ["title", "author", "likes"])
        );
    });

    test("of a bigger list is correct", () => {
        assert.deepStrictEqual(
            listHelper.favoriteBlog(initialBlogs),
            _.pick(initialBlogs[2], ["title", "author", "likes"])
        );
    });
});

describe("most blogs by author", () => {
    test("of an empty list is null", () => {
        assert.strictEqual(listHelper.mostBlogs([]), null);
    });

    test("of a list with one blog matches author", () => [
        assert.deepStrictEqual(listHelper.mostBlogs([initialBlogs[0]]), {
            author: initialBlogs[0].author,
            blogs: 1,
        }),
    ]);

    test("of a bigger list is correct", () => {
        assert.deepStrictEqual(listHelper.mostBlogs(initialBlogs), {
            author: "Robert C. Martin",
            blogs: 3,
        });
    });
});

describe("most likes by author", () => {
    test("of an empty list is null", () => {
        assert.strictEqual(listHelper.mostLikes([]), null);
    });

    test("of a list with one blog matches author and likes", () => {
        assert.deepStrictEqual(
            listHelper.mostLikes([initialBlogs[0]]),
            _.pick(initialBlogs[0], ["author", "likes"])
        );
    });

    test("of a bigger list is correct", () => {
        assert.deepStrictEqual(listHelper.mostLikes(initialBlogs), {
            author: "Edsger W. Dijkstra",
            likes: 17,
        });
    });
});
