import { expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Blog from "./Blog";

test("<Blog /> initially renders only title and author", () => {
    const blog = {
        title: "This is a blog post",
        author: "Linus Gates",
        likes: 3,
        url: "linus.gates.com",
    };

    render(
        <Blog
            blog={blog}
            handleLike={() => {}}
            showRemove={false}
            handleRemove={() => {}}
        />
    );

    screen.getByText(blog.title);
    screen.getByText(blog.author);

    const likes = screen.queryByText(`likes ${blog.likes}`);
    expect(likes).toBeNull();

    const url = screen.queryByText(blog.url);
    expect(url).toBeNull();
});
