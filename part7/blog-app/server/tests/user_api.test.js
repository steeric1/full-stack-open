const { it, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const USERS_ENDPOINT = "/api/users";
const getUsers = () => api.get(USERS_ENDPOINT);
const postUser = (body) => api.post(USERS_ENDPOINT).send(body);

describe("User API (initialized with one user)", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const user = new User({
            username: "root",
            name: "Super User",
            passwordHash: await bcrypt.hash("secret pass", 1),
        });

        await user.save();
    });

    describe(`POST ${USERS_ENDPOINT}`, () => {
        it("adds new user and returns it as JSON", async () => {
            await postUser({
                username: "steeric",
                password: "very secret password",
            })
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const response = await getUsers();
            assert.strictEqual(response.body.length, 2);
        });

        it("rejects user with missing username", async () => {
            let response = await postUser({
                password: "very secret password",
            }).expect(400);

            assert(
                response.body.error &&
                    response.body.error.includes("Missing 'username'")
            );

            response = await getUsers();
            assert.strictEqual(response.body.length, 1);
        });

        it("rejects user with too short username", async () => {
            let response = await postUser({
                username: "s",
                password: "very secret password",
            }).expect(400);

            assert(
                response.body.error &&
                    response.body.error.includes("'username' must be at least")
            );

            response = await getUsers();
            assert.strictEqual(response.body.length, 1);
        });

        it("rejects user with missing password", async () => {
            let response = await postUser({
                username: "steeric",
            }).expect(400);

            assert(
                response.body.error &&
                    response.body.error.includes("Missing 'password'")
            );

            response = await getUsers();
            assert.strictEqual(response.body.length, 1);
        });

        it("rejects user with too short password", async () => {
            let response = await postUser({
                username: "steeric",
                password: "v",
            }).expect(400);

            assert(
                response.body.error &&
                    response.body.error.includes("'password' must be at least")
            );

            response = await getUsers();
            assert.strictEqual(response.body.length, 1);
        });
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
