import { useParams } from "react-router-dom";

import { useUsers } from "../hooks";
import Link from "./ui/Link";
import BlogWrapper from "./ui/BlogWrapper";

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
            <h3>Added blogs</h3>
            {user.blogs.map((blog) => (
                <BlogWrapper key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </BlogWrapper>
            ))}
        </div>
    );
};

export default User;
