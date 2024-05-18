import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState(null);

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

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login(username, pass);

            setUser(user);
            localStorage.setItem("loggedInUser", JSON.stringify(user));
        } catch (error) {
            console.log("login failed", error);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("loggedInUser");
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <label htmlFor="username">
                username{" "}
                <input
                    id="username"
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
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
    );

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            {userInfo()}
            {blogForm()}
            <br />
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );

    const userInfo = () => (
        <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout}>log out</button>
        </p>
    );

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleCreate = async (event) => {
        event.preventDefault();

        try {
            const blog = await blogService.create({ title, author, url });
            setBlogs([...blogs, blog]);
            setTitle("");
            setAuthor("");
            setUrl("");
        } catch (error) {
            console.log("failed to create blog", error);
        }
    };

    const blogForm = () => (
        <form onSubmit={handleCreate}>
            <h3>create new</h3>
            <label htmlFor="title">
                title{" "}
                <input
                    id="title"
                    name="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    required
                />
            </label>
            <br />
            <label htmlFor="author">
                author{" "}
                <input
                    id="author"
                    name="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    required
                />
            </label>
            <br />
            <label htmlFor="url">
                url{" "}
                <input
                    id="url"
                    name="url"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">create</button>
        </form>
    );

    return <div>{user ? blogList() : loginForm()}</div>;
};

export default App;
