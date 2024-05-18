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
        display: infoVisible ? "block" : "none",
    };

    return (
        <div style={wrapperStyle}>
            <div style={titleStyle}>
                <div>
                    {blog.title} {blog.author}
                </div>
                <button onClick={() => setInfoVisible(!infoVisible)}>
                    {infoVisible ? "hide" : "show"}
                </button>
            </div>
            <section style={infoStyle}>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}{" "}
                    <button onClick={handleLike}>like</button>
                </div>
                <div>{blog.author}</div>
                {showRemove && <button onClick={handleRemove}>remove</button>}
            </section>
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
