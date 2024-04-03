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

module.exports = { totalLikes, favoriteBlog };
