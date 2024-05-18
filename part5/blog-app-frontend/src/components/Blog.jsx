import { useState } from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
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
                    likes {blog.likes} <button>like</button>
                </div>
                <div>{blog.author}</div>
            </section>
        </div>
    );
};

export default Blog;
