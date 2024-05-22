import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import blogService from "../services/blogs";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Button from "./ui/Button";
import Input from "./ui/Input";

const Form = styled.form`
    width: max(50%, 300px);
`;

const Field = styled.div`
    margin-bottom: 5px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-weight: 600;
    gap: 5px;
`;

const BlogForm = ({ toggleVisibility }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await dispatch(createBlog({ title, author, url }));

            dispatch(setNotification(`new blog: ${title} (by ${author})`));
            toggleVisibility();

            setTitle("");
            setAuthor("");
            setUrl("");
        } catch (error) {
            dispatch(setNotification("failed to create blog", "error"));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Add new blog</h3>
            <Field>
                <Label htmlFor="title">
                    <div>Title</div>
                    <Input
                        data-testid="title"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        required
                    />
                </Label>
            </Field>
            <Field>
                <Label htmlFor="author">
                    <div>Author</div>
                    <Input
                        data-testid="author"
                        id="author"
                        name="author"
                        placeholder="Enter author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        required
                    />
                </Label>
            </Field>
            <Field>
                <Label htmlFor="url">
                    <div>URL</div>
                    <Input
                        data-testid="url"
                        id="url"
                        name="url"
                        placeholder="Enter URL"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        required
                    />
                </Label>
            </Field>
            <Button style={{ marginTop: "5px" }} type="submit">
                Add
            </Button>
        </Form>
    );
};

BlogForm.propTypes = {
    toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
