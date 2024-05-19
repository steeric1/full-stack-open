import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

describe("<Blog />", () => {
    const blog = {
        title: "This is a blog post",
        author: "Linus Gates",
        likes: 3,
        url: "linus.gates.com",
        user: {
            name: "Steve Torvalds",
        },
    };

    beforeEach(() => {
        render(
            <Blog
                blog={blog}
                handleLike={() => {}}
                showRemove={false}
                handleRemove={() => {}}
            />
        );
    });

    test("initially renders only title and author", () => {
        screen.getByText(blog.title);
        screen.getByText(blog.author);

        const likes = screen.queryByText(`likes ${blog.likes}`);
        expect(likes).toBeNull();

        const url = screen.queryByText(blog.url);
        expect(url).toBeNull();
    });

    test("renders url, likes and user when expanded", async () => {
        const user = userEvent.setup();
        const button = screen.getByText("show");

        await user.click(button);

        screen.queryByText(`likes ${blog.likes}`);
        screen.getByText(blog.url);
        screen.getByText(blog.user.name);
    });
});
