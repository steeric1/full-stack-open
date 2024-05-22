import { useState } from "react";
import PropTypes from "prop-types";

import Togglable from "./Togglable";

const Blog = ({ blog, handleLike, showRemove, handleRemove }) => {
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
    handleLike: PropTypes.func.isRequired,
    showRemove: PropTypes.bool.isRequired,
    handleRemove: PropTypes.func.isRequired,
};

export default Blog;
