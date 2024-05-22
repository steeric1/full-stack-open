import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";

import { useUser } from "./hooks";

const User = ({ user, handleLogout }) => (
    <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
    </p>
);

const App = () => {
    const [user, userService] = useUser();

    useEffect(() => {
        userService.init();
    }, []);

    if (!user) {
        return (
            <>
                <Notification />
                <LoginForm />
            </>
        );
    }

    return (
        <div>
            <Notification />

            <h2>blogs</h2>

            <User user={user} handleLogout={userService.logout} />

            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </div>
    );
};

export default App;
