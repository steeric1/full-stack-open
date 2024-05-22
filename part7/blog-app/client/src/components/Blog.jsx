import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { commentBlog, likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useCurrentUser } from "../hooks";
import Link from "./ui/Link";
import SmallButton from "./ui/SmallButton";
import Input from "./ui/Input";
import Button from "./ui/Button";

const InfoRow = styled.div`
    margin-bottom: 8px;
`;

const Blog = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
    const [user] = useCurrentUser();
    const navigate = useNavigate();

    if (!blog) {
        return null;
    }

    const handleLike = async () => {
        try {
            await dispatch(likeBlog(blog));
        } catch (error) {
            dispatch(setNotification("Failed to like blog", "error"));
        }
    };

    const handleRemove = async () => {
        if (!confirm("Are you sure?")) {
            return;
        }

        try {
            await dispatch(removeBlog(blog));
            navigate("/");
            dispatch(setNotification("Blog was removed"));
        } catch (error) {
            dispatch(setNotification("Failed to remove blog", "error"));
        }
    };

    const showRemove = blog.user ? blog.user.username === user.username : false;

    const handleComment = async (event) => {
        event.preventDefault();

        const content = event.target.comment.value;
        event.target.comment.value = "";

        try {
            await dispatch(commentBlog(blog, content));
            dispatch(setNotification(`You commented on '${blog.title}'`));
        } catch (error) {
            dispatch(setNotification("Failed to comment", "error"));
        }
    };

    return (
        <div>
            <h2>{blog.title}</h2>
            <section>
                <div>
                    <InfoRow>
                        Read blog: <Link to={blog.url}>{blog.url}</Link>
                    </InfoRow>
                    <InfoRow>
                        <span>{blog.likes} likes</span>{" "}
                        <SmallButton onClick={handleLike}>Like</SmallButton>
                    </InfoRow>
                    <InfoRow>
                        {blog.user ? `Added by ${blog.user.name}` : ""}
                    </InfoRow>
                    <InfoRow>
                        {showRemove && (
                            <SmallButton onClick={handleRemove}>
                                Remove
                            </SmallButton>
                        )}
                    </InfoRow>
                </div>
                <div>
                    <h3>Comments</h3>
                    <form onSubmit={handleComment}>
                        <Input name="comment" required />
                        <div style={{ marginTop: "5px" }}>
                            <SmallButton>Add comment</SmallButton>
                        </div>
                    </form>
                    <ul>
                        {blog.comments.map((comment) => (
                            <li key={comment.id}>{comment.content}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Blog;
