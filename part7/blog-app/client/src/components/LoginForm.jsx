import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useCurrentUser } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import Button from "./ui/Button";
import Input from "./ui/Input";

const Form = styled.form`
    width: max(30%, 200px);
`;

const Field = styled.div`
    margin-bottom: 10px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: 5px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [_, { login }] = useCurrentUser();

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await login(name, pass);
            dispatch(setNotification(""));
        } catch (error) {
            dispatch(setNotification("Wrong username or password", "error"));
        }
    };

    return (
        <div>
            <h2>Log in to the application</h2>
            <Form onSubmit={handleLogin}>
                <Field>
                    <Label htmlFor="username">
                        Username
                        <Input
                            data-testid="username"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            onChange={({ target }) => setName(target.value)}
                            required
                        />
                    </Label>
                </Field>
                <Field>
                    <Label htmlFor="password">
                        Password
                        <Input
                            data-testid="password"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            onChange={({ target }) => setPass(target.value)}
                            required
                        />
                    </Label>
                </Field>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;
