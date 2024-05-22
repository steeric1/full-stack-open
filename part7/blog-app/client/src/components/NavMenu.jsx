import { Link } from "react-router-dom";

import { useCurrentUser } from "../hooks";

const NavMenu = () => {
    const [currentUser, { logout }] = useCurrentUser();

    const navStyle = {
        display: "flex",
        gap: "10px",
        margin: "5px",
        padding: "5px",
        backgroundColor: "LightGray",
    };

    return (
        <nav style={navStyle}>
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
            <span>
                {currentUser.name} logged in{" "}
                <button onClick={logout}>log out</button>
            </span>
        </nav>
    );
};

export default NavMenu;
