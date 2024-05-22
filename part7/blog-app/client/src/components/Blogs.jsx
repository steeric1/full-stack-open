import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

import { initializeBlogs, likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useUsers } from "../hooks";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs);
    const blogTogglerRef = useRef();

    const wrapperStyle = {
        border: "1px solid black",
        borderRadius: 4,
        padding: 4,
        paddingLeft: 8,
        marginBottom: 4,
    };

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
                <div key={blog.id} style={wrapperStyle}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </div>
            ))}
        </>
    );
};

export default Blogs;
