import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

import { initializeBlogs, likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useUsers } from "../hooks";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs);
    const dispatch = useDispatch();
    const blogTogglerRef = useRef();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    return (
        <>
            <Togglable showButtonLabel="create new blog" ref={blogTogglerRef}>
                <BlogForm
                    toggleVisibility={() =>
                        blogTogglerRef.current.toggleVisibility()
                    }
                />
            </Togglable>

            <br />

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    );
};

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const [user] = useUsers();

    const [infoVisible, setInfoVisible] = useState(false);

    const wrapperStyle = {
        border: "1px solid black",
        borderRadius: 4,
        padding: 4,
        paddingLeft: 8,
        marginBottom: 4,
    };

    const titleStyle = {
        display: "flex",
        alignItems: "center",
        gap: 6,
    };

    const infoStyle = {
        margin: 4,
    };

    const handleLike = async () => {
        try {
            await dispatch(likeBlog(blog));
        } catch (error) {
            dispatch(setNotification("failed to like blog", "error"));
        }
    };

    const handleRemove = async () => {
        if (!confirm("Are you sure?")) {
            return;
        }

        try {
            await dispatch(removeBlog(blog));
            dispatch(setNotification("removed blog"));
        } catch (error) {
            dispatch(setNotification("failed to remove blog", "error"));
        }
    };

    const showRemove = blog.user ? blog.user.username === user.username : false;

    const info = () => (
        <section style={infoStyle}>
            <div>{blog.url}</div>
            <div>
                <span>likes {blog.likes}</span>{" "}
                <button onClick={handleLike}>like</button>
            </div>
            <div>{blog.user ? blog.user.name : ""}</div>
            {showRemove && <button onClick={handleRemove}>remove</button>}
        </section>
    );

    return (
        <div
            style={wrapperStyle}
            className="blog"
            data-testid={`blog-${blog.id}`}
        >
            <div style={titleStyle} className="blog-title">
                <div>
                    <span>{blog.title}</span> <span>{blog.author}</span>
                </div>
                <button onClick={() => setInfoVisible(!infoVisible)}>
                    {infoVisible ? "hide" : "show"}
                </button>
            </div>
            {infoVisible && info()}
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default Blogs;
