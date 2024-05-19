import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleSubmit }) => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div>
            <h2>log in to the application</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(name, pass);
                }}
            >
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

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
