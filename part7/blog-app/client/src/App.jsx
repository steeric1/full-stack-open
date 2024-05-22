import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";

import { useCurrentUser, useUsers } from "./hooks";

const App = () => {
    const [_, initializeUsers] = useUsers();
    useEffect(() => initializeUsers(), []);

    const [currentUser, { logout }] = useCurrentUser();
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
            <Notification />

            <h2>blogs</h2>

            <p>
                {currentUser.name} logged in{" "}
                <button onClick={logout}>log out</button>
            </p>

            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
            </Routes>
        </>
    );
};

export default App;
