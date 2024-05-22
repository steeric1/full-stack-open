import { useState, useEffect } from "react";

import userService from "../services/users";
import { useUsers } from "../hooks";
import Link from "./ui/Link";

const Users = () => {
    const [users] = useUsers();

    return (
        <>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Blogs added</th>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;
