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
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setUser(JSON.parse(user));
        }
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

    return <div>{user ? blogList() : loginForm()}</div>;
};

export default App;
