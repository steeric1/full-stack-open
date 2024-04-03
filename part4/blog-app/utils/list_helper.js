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
    return (
        _.chain(blogs)
            .countBy("author")
            .toPairs()
            .map(([author, numBlogs]) => ({
                author,
                blogs: numBlogs,
            }))
            .orderBy("blogs", "desc")
            .head()
            .value() || null
    );
};

const mostLikes = (blogs) => {
    return (
        _.chain(blogs)
            .groupBy("author")
            .map((blogs) => {
                let likes = _.reduce(blogs, (sum, { likes }) => sum + likes, 0);
                return { author: blogs[0].author, likes };
            })
            .orderBy("likes", "desc")
            .head()
            .value() || null
    );
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
