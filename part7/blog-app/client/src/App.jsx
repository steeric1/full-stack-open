import {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

import {
    createBlog,
    likeBlog,
    initializeBlogs,
    removeBlog,
} from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { useUser } from "./hooks";

const User = ({ user, handleLogout }) => (
    <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
    </p>
);

const App = () => {
    const blogs = useSelector((state) => state.blogs);
    const [user, userService] = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
        userService.init();
    }, []);

    const notify = (message, kind = "") =>
        dispatch(setNotification(message, kind));

    const blogTogglerRef = useRef();

    if (!user) {
        return <LoginForm />;
    }

    return (
        <div>
            <Notification />

            <h2>blogs</h2>

            <User user={user} handleLogout={userService.logout} />

            <Togglable showButtonLabel="create new blog" ref={blogTogglerRef}>
                <BlogForm
                    toggleVisibility={() =>
                        blogTogglerRef.current.toggleVisibility()
                    }
                />
            </Togglable>

            <br />

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
