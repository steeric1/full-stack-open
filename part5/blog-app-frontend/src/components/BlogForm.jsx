import { useState } from "react";
import PropTypes from "prop-types";

import blogService from "../services/blogs";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createBlog({ title, author, url });

        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>create new</h3>
            <label htmlFor="title">
                title{" "}
                <input
                    id="title"
                    name="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    required
                />
            </label>
            <br />
            <label htmlFor="author">
                author{" "}
                <input
                    id="author"
                    name="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    required
                />
            </label>
            <br />
            <label htmlFor="url">
                url{" "}
                <input
                    id="url"
                    name="url"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">create</button>
        </form>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
