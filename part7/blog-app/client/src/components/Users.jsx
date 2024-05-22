import { useState, useEffect } from "react";

import userService from "../services/users";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const users = await userService.getAll();
            setUsers(users);
        })();
    });

    return (
        <>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;
