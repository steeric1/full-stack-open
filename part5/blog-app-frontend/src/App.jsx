import {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useRef,
} from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import "./styles.css";

const LoginForm = ({ handleSubmit }) => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div>
            <h2>log in to the application</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(name, pass);
                }}
            >
                <label htmlFor="username">
                    username{" "}
                    <input
                        id="username"
                        name="username"
                        onChange={({ target }) => setName(target.value)}
                        required
                    />
                </label>
                <br />
                <label htmlFor="password">
                    password{" "}
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={({ target }) => setPass(target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">login</button>
            </form>
        </div>
    );
};

const User = ({ user, handleLogout }) => (
    <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
    </p>
);

const Notification = ({ kind, message }) => (
    <div className={`notification ${kind ?? ""}`}>{message}</div>
);

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        blogService.setToken(user ? user.token : null);
    }, [user]);

    useEffect(() => {
        if (notification) {
            setTimeout(() => setNotification(null), 4000);
        }
    }, [notification]);

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
            setNotification({
                kind: "error",
                message: "wrong username or password",
            });
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

                            setNotification({
                                message: `new blog: ${blog.title} (by ${blog.author})`,
                            });

                            blogFormRef.current.toggleVisibility();
                        } catch (error) {
                            setNotification({
                                kind: "error",
                                message: "failed to create blog",
                            });
                        }
                    }}
                />
            </Togglable>

            <br />

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    ) : (
        <LoginForm handleSubmit={handleLogin} />
    );

    return (
        <>
            {notification && <Notification {...notification} />}
            {main}
        </>
    );
};

export default App;
