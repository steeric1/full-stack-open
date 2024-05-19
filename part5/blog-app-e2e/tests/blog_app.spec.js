const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog App", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("http:localhost:3003/api/testing/reset");
        await request.post("http://localhost:3003/api/users", {
            data: {
                name: "Markku Kankainen",
                username: "markku",
                password: "markunsalis",
            },
        });

        await page.goto("http://localhost:5173");
    });

    test("login form is shown on front page", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: "log in to the application" })
        ).toBeVisible();

        await expect(page.getByTestId("username")).toBeVisible();
        await expect(page.getByTestId("password")).toBeVisible();
    });
});
