import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Link from "./ui/Link";
import BlogWrapper from "./ui/BlogWrapper";

import { initializeBlogs, likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useUsers } from "../hooks";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs);
    const blogTogglerRef = useRef();

    return (
        <>
            <h2>Blogs</h2>

            <Togglable showButtonLabel="Add new" ref={blogTogglerRef}>
                <BlogForm
                    toggleVisibility={() =>
                        blogTogglerRef.current.toggleVisibility()
                    }
                />
            </Togglable>

            <br />

            {blogs.map((blog) => (
                <BlogWrapper key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </BlogWrapper>
            ))}
        </>
    );
};

export default Blogs;
