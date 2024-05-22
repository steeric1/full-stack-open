import {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useRef,
} from "react";
import { useDispatch } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification } from "./reducers/notificationReducer";

const User = ({ user, handleLogout }) => (
    <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
    </p>
);

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const notify = (message, kind = "") =>
        dispatch(setNotification(message, kind));

    useEffect(() => {
        blogService.setToken(user ? user.token : null);
    }, [user]);

    useEffect(() => {
        (async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        })();
    }, []);

    useEffect(() => {
        let user = localStorage.getItem("loggedInUser");
        user && setUser(JSON.parse(user));
    }, []);

    const handleLogin = async (name, pass) => {
        try {
            const user = await loginService.login(name, pass);

            setUser(user);
            localStorage.setItem("loggedInUser", JSON.stringify(user));
        } catch (error) {
            notify("wrong username or password", "error");
        }
    };

    const blogFormRef = useRef();

    const main = user ? (
        <div>
            <h2>blogs</h2>

            <User
                user={user}
                handleLogout={() => {
                    setUser(null);
                    localStorage.removeItem("loggedInUser");
                }}
            />

            <Togglable showButtonLabel="create new blog" ref={blogFormRef}>
                <BlogForm
                    createBlog={async (blog) => {
                        try {
                            const newBlog = await blogService.create(blog);
                            setBlogs([...blogs, newBlog]);

                            notify(
                                `new blog: ${blog.title} (by ${blog.author})`,
                            );

                            blogFormRef.current.toggleVisibility();
                        } catch (error) {
                            notify("failed to create blog", "error");
                        }
                    }}
                />
            </Togglable>

            <br />

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={async () => {
                            try {
                                const liked = await blogService.like(blog);
                                setBlogs(
                                    blogs.map((blog) =>
                                        blog.id === liked.id ? liked : blog,
                                    ),
                                );
                            } catch (error) {
                                notify("failed to like blog", "error");
                            }
                        }}
                        showRemove={
                            blog.user
                                ? blog.user.username === user.username
                                : false
                        }
                        handleRemove={async () => {
                            if (!confirm("Are you sure?")) {
                                return;
                            }

                            try {
                                await blogService.remove(blog);
                                setBlogs(blogs.filter((b) => b.id !== blog.id));
                                notify("removed blog");
                            } catch (error) {
                                notify("failed to remove blog", "error");
                            }
                        }}
                    />
                ))}
        </div>
    ) : (
        <LoginForm handleSubmit={handleLogin} />
    );

    return (
        <>
            <Notification />
            {main}
        </>
    );
};

export default App;
