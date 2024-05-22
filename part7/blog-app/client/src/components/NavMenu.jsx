import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "./ui/Button";
import { useCurrentUser } from "../hooks";

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    padding: 10px;
    padding-inline: 25px;
    background-color: #efeff5;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 5px;
    border-top: 2px solid indigo;
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const NavLink = styled(Link)`
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.15em;

    &:hover {
        color: indigo;
    }
`;

const UserMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const UserName = styled.span`
    font-weight: 500;
`;

const NavMenu = () => {
    const [currentUser, { logout }] = useCurrentUser();

    return (
        <Nav>
            <NavLinks>
                <NavLink to="/">Blogs</NavLink>
                <NavLink to="/users">Users</NavLink>
            </NavLinks>
            <UserMenu>
                <UserName>{currentUser.name}</UserName>
                <Button onClick={logout}>Log out</Button>
            </UserMenu>
        </Nav>
    );
};

export default NavMenu;
