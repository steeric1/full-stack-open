const _ = require("lodash");

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
    let idx = -1;
    let max = 0;
    blogs.forEach((blog, i) => {
        max = Math.max(max, blog.likes);
        idx = max === blog.likes ? i : idx;
    });

    let blog = blogs[idx];
    if (!blog) return null;

    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
    };
};

const mostBlogs = (blogs) => {
    let byAuthorBlogs = _.orderBy(
        _.toPairs(_.countBy(blogs, "author")).map(([author, numBlogs]) => {
            return { author, blogs: numBlogs };
        }),
        "blogs",
        "desc"
    );

    return byAuthorBlogs[0] || null;
};

module.exports = { totalLikes, favoriteBlog, mostBlogs };
