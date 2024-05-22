import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";

const slice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        initializeUser(state, action) {
            return JSON.parse(localStorage.getItem("loggedInUser"));
        },
        logoutUser() {
            localStorage.removeItem("loggedInUser");
            return null;
        },
        set(state, action) {
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(action.payload),
            );
            return action.payload;
        },
    },
});

export const { initializeUser, logoutUser } = slice.actions;
const { set } = slice.actions;

export const loginUser = (name, pass) => {
    return async (dispatch) => {
        const user = await loginService.login(name, pass);
        dispatch(set(user));
    };
};

export default slice.reducer;
