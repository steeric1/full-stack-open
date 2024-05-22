import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";

import { useCurrentUser, useUsers } from "./hooks";
import { initializeBlogs } from "./reducers/blogReducer";
import NavMenu from "./components/NavMenu";

const App = () => {
    const dispatch = useDispatch();
    const [_, initializeUsers] = useUsers();
    useEffect(() => {
        dispatch(initializeBlogs());
        initializeUsers();
    }, []);

    const [currentUser] = useCurrentUser();
    if (!currentUser) {
        return (
            <>
                <Notification />
                <LoginForm />
            </>
        );
    }

    return (
        <>
            <NavMenu />

            <Notification />

            <h2>blog app</h2>

            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
        </>
    );
};

export default App;
