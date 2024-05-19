import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
    test("calls onSubmit with correct data", async () => {
        const blog = {
            title: "This is a blog post",
            author: "Linus Gates",
            url: "linus.gates.com",
        };

        const user = userEvent.setup();
        const createBlog = vi.fn();

        const { container } = render(<BlogForm createBlog={createBlog} />);

        await user.type(container.querySelector("#title"), blog.title);
        await user.type(container.querySelector("#author"), blog.author);
        await user.type(container.querySelector("#url"), blog.url);

        const submitBtn = screen.getByText("create");
        await user.click(submitBtn);

        expect(createBlog.mock.calls).toHaveLength(1);

        const arg = createBlog.mock.calls[0][0];
        expect(arg).toStrictEqual(blog);
    });
});
