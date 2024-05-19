const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

const user = {
    name: "Markku Kankainen",
    username: "markku",
    password: "markunsalis",
};

const anotherUser = {
    name: "Seppo Järvinen",
    username: "seppo",
    password: "seponsalis",
};

const blogs = [
    {
        title: "Blog 1",
        author: "Author 1",
        url: "one.url",
    },
    {
        title: "Blog 2",
        author: "Author 2",
        url: "two.url",
    },
    {
        title: "Blog 3",
        author: "Author 3",
        url: "three.url",
    },
];

describe("Blog App", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("http:localhost:3003/api/testing/reset");

        await request.post("http://localhost:3003/api/users", {
            data: user,
        });

        await request.post("http://localhost:3003/api/users", {
            data: anotherUser,
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
            await loginWith(page, user.username, user.password);
        });

        test("a new blog can be created", async ({ page }) => {
            await createBlog(page, blogs[0]);

            await expect(
                page.getByText(`${blogs[0].title} ${blogs[0].author}`)
            ).toBeVisible();
        });

        describe("and a blog has been created", () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, blogs[0]);
            });

            test("a blog can be liked", async ({ page }) => {
                await page.getByRole("button", { name: "show" }).click();

                await expect(page.getByText("likes 0")).toBeVisible();
                await page.getByRole("button", { name: "like" }).click();
                await expect(page.getByText("likes 1")).toBeVisible();
            });

            test("the blog can be removed", async ({ page }) => {
                await page.getByRole("button", { name: "show" }).click();

                page.on("dialog", (dialog) => dialog.accept());
                await page.getByRole("button", { name: "remove" }).click();

                await expect(
                    page.getByText(`${blogs[0].title} ${blogs[0].author}`)
                ).not.toBeVisible();
            });

            test("another user doesn't see remove button", async ({ page }) => {
                await page.getByRole("button", { name: "log out" }).click();
                await loginWith(
                    page,
                    anotherUser.username,
                    anotherUser.password
                );

                await page.getByRole("button", { name: "show" }).click();
                await expect(
                    page.getByRole("button", { name: "remove" })
                ).not.toBeVisible();
            });

            test("blogs are sorted with respect to likes", async ({ page }) => {
                await createBlog(page, blogs[1]);
                await createBlog(page, blogs[2]);

                const allBlogs = await page.locator(".blog").all();

                const ids = await Promise.all(
                    allBlogs.map(
                        async (blog) => await blog.getAttribute("data-testid")
                    )
                );
                expect(ids).toHaveLength(3);

                for (let i = 0; i < ids.length; ++i) {
                    const current = page.getByTestId(ids[i]);
                    await current.getByRole("button", { name: "show" }).click();

                    for (let j = 0; j < i + 1; ++j) {
                        await current
                            .getByRole("button", { name: "like" })
                            .click();

                        await current.getByText(`likes ${j + 1}`).waitFor();
                    }
                }

                const likes = await page.getByText(/likes/).all();
                expect(likes).toHaveLength(3);

                const toNum = async (likes) =>
                    Number((await likes.textContent()).replace("likes ", ""));

                for (let i = 1; i < likes.length; ++i) {
                    expect(await toNum(likes[i])).toBeLessThan(
                        await toNum(likes[i - 1])
                    );
                }
            });
        });
    });
});
