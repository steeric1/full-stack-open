const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const valid = user && (await bcrypt.compare(password, user.passwordHash));
    if (!user || !valid) {
        return response.status(401).json({
            error: "invalid username of password",
        });
    }

    const token = jwt.sign({ username, id: user._id }, process.env.SECRET);
    response.status(200).json({ token, username, name: user.name });
});

module.exports = loginRouter;
