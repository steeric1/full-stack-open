import { useParams } from "react-router-dom";

import { useUsers } from "../hooks";

const User = () => {
    const [users] = useUsers();
    const id = useParams().id;

    // we assume there's always at least one user
    if (users.length === 0) {
        return <div>Loading...</div>;
    }

    const user = users.find((u) => u.id === id);
    if (!user) {
        return <div>No user found.</div>;
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
