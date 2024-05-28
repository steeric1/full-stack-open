import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [login, { data }] = useMutation(LOGIN, {
        onError: (error) => setError(error.graphQLErrors[0].message),
    });

    useEffect(() => {
        if (data) {
            setError("");
            const token = data.login.value;
            setToken(token);
            localStorage.setItem("libraryUserToken", token);
        }
    }, [data]);

    if (!show) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    name{" "}
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    password{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
            </div>
            <button>log in</button>{" "}
            {error && (
                <span style={{ color: "red", fontSize: "0.8em" }}>{error}</span>
            )}
        </form>
    );
};

export default LoginForm;
