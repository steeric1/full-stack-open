import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import userService from "../services/users";

const slice = createSlice({
    name: "users",
    initialState: { current: null, all: [] },
    reducers: {
        removeCurrent(state) {
            localStorage.removeItem("loggedInUser");
            return { ...state, current: null };
        },
        setCurrent(state, action) {
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(action.payload),
            );
            return { ...state, current: action.payload };
        },
        setAll(state, action) {
            return { ...state, all: action.payload };
        },
    },
});

export const { removeCurrent } = slice.actions;
const { setCurrent, setAll, setInitialized } = slice.actions;

export const initializeUsers = () => {
    return async (dispatch) => {
        const current = JSON.parse(localStorage.getItem("loggedInUser"));
        dispatch(setCurrent(current));

        const all = await userService.getAll();
        dispatch(setAll(all));
    };
};

export const loginUser = (name, pass) => {
    return async (dispatch) => {
        const user = await loginService.login(name, pass);
        dispatch(setCurrent(user));
    };
};

export default slice.reducer;
