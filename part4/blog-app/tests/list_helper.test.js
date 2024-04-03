const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
    },
];

describe("total likes", () => {
    test("of an empty list equals zero", () => {
        assert.strictEqual(listHelper.totalLikes([]), 0);
    });

    test("of a list with one blog equals likes of the singular blog", () => {
        assert.strictEqual(listHelper.totalLikes([blogs[0]]), blogs[0].likes);
    });

    test("of a bigger list is calculated correctly", () => {
        let likes = 0;
        blogs.forEach((blog) => (likes += blog.likes));

        assert.strictEqual(listHelper.totalLikes(blogs), likes);
    });
});

describe("favorite blog", () => {
    const blogsEqual = (blog1, blog2) =>
        blog1.title === blog2.title &&
        blog1.author === blog2.author &&
        blog1.likes === blog2.likes;

    test("of an empty list is null", () => {
        assert.strictEqual(listHelper.favoriteBlog([]), null);
    });

    test("of a list with one blog is that blog", () => {
        assert(blogsEqual(listHelper.favoriteBlog([blogs[0]]), blogs[0]));
    });

    test("of a bigger list is correct", () => {
        assert(blogsEqual(listHelper.favoriteBlog(blogs), blogs[2]));
    });
});
