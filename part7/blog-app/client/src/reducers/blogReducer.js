import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const sort = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
};

const slice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        set(state, action) {
            return action.payload;
        },
        append(state, action) {
            return sort(state.concat(action.payload));
        },
        update(state, { payload }) {
            return sort(
                state.map((blog) => (blog.id === payload.id ? payload : blog)),
            );
        },
        remove(state, { payload }) {
            return sort(state.filter((blog) => blog.id !== payload.id));
        },
    },
});

const { set, append, update, remove } = slice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = sort(await blogService.getAll());
        dispatch(set(blogs));
    };
};

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog);
        dispatch(append(newBlog));
    };
};

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const liked = await blogService.like(blog);
        dispatch(update(liked));
    };
};

export const removeBlog = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog);
        dispatch(remove(blog));
    };
};

export default slice.reducer;
