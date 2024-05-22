import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useCurrentUser } from "../hooks";

const Blog = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
    const [user] = useCurrentUser();

    if (!blog) {
        return null;
    }

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

    const margin = {
        margin: 4,
    };

    return (
        <div>
            <h2>{blog.title}</h2>
            <section style={margin}>
                <div>{blog.url}</div>
                <div>
                    <span>likes {blog.likes}</span>{" "}
                    <button onClick={handleLike}>like</button>
                </div>
                <div>{blog.user ? `Added by ${blog.user.name}` : ""}</div>
                {showRemove && <button onClick={handleRemove}>remove</button>}
            </section>
        </div>
    );
};

export default Blog;
