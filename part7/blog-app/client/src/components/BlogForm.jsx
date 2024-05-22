import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import blogService from "../services/blogs";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ toggleVisibility }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await dispatch(createBlog({ title, author, url }));

            dispatch(setNotification(`new blog: ${title} (by ${author})`));
            toggleVisibility();

            setTitle("");
            setAuthor("");
            setUrl("");
        } catch (error) {
            dispatch(setNotification("failed to create blog", "error"));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>create new</h3>
            <label htmlFor="title">
                title{" "}
                <input
                    data-testid="title"
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
                    data-testid="author"
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
                    data-testid="url"
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
    toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
