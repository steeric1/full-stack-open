const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith } = require("./helper");

const user = {
    name: "Markku Kankainen",
    username: "markku",
    password: "markunsalis",
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
            await page.getByRole("button", { name: "create new blog" }).click();

            await page.getByTestId("title").fill("Foo Blog");
            await page.getByTestId("author").fill("Foo Author");
            await page.getByTestId("url").fill("Foo Url");

            await page.getByRole("button", { name: "create" }).click();

            await expect(page.getByText("Foo Blog Foo Author")).toBeVisible();
        });
    });
});
