import { useState } from "react";
import { useDispatch } from "react-redux";

import { useUser } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [_, service] = useUser();

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await service.login(name, pass);
        } catch (error) {
            dispatch(setNotification("wrong username or password", "error"));
        }
    };

    return (
        <div>
            <h2>log in to the application</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">
                    username{" "}
                    <input
                        data-testid="username"
                        id="username"
                        name="username"
                        onChange={({ target }) => setName(target.value)}
                        required
                    />
                </label>
                <br />
                <label htmlFor="password">
                    password{" "}
                    <input
                        data-testid="password"
                        id="password"
                        name="password"
                        type="password"
                        onChange={({ target }) => setPass(target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
