const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

const user = {
    name: "Markku Kankainen",
    username: "markku",
    password: "markunsalis",
};

const blog = {
    title: "Foo Blog",
    author: "Foo Author",
    url: "foo.url",
};

describe("Blog App", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("http:localhost:3003/api/testing/reset");
        await request.post("http://localhost:3003/api/users", {
            data: user,
        });

        await page.goto("http://localhost:5173");
    });

    test("login form is shown on front page", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: "log in to the application" })
        ).toBeVisible();

        await expect(page.getByTestId("username")).toBeVisible();
        await expect(page.getByTestId("password")).toBeVisible();

        await expect(page.getByRole("button", { name: "login" })).toBeVisible();
    });

    describe("login", () => {
        test("succeeds with correct credentials", async ({ page }) => {
            await loginWith(page, user.username, user.password);

            await expect(
                page.getByText(`${user.name} logged in`)
            ).toBeVisible();
        });

        test("fails with wrong credentials", async ({ page }) => {
            await loginWith(page, user.username, "wrong");

            await expect(
                page.getByText(`${user.name} logged in`)
            ).not.toBeVisible();

            await expect(
                page.getByText("wrong username or password")
            ).toBeVisible();
        });
    });

    describe("when logged in", () => {
        beforeEach(async ({ page }) => {
            loginWith(page, user.username, user.password);
        });

        test("a new blog can be created", async ({ page }) => {
            createBlog(page, blog);

            await expect(
                page.getByText(`${blog.title} ${blog.author}`)
            ).toBeVisible();
        });

        describe("and a blog has been created", () => {
            beforeEach(async ({ page }) => {
                createBlog(page, blog);
            });

            test("a blog can be liked", async ({ page }) => {
                await page.getByRole("button", { name: "show" }).click();

                await expect(page.getByText("likes 0")).toBeVisible();
                await page.getByRole("button", { name: "like" }).click();
                await expect(page.getByText("likes 1")).toBeVisible();
            });
        });
    });
});
