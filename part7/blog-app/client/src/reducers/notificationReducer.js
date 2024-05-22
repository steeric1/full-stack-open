import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "notification",
    initialState: { message: "", kind: "" },
    reducers: {
        set(state, action) {
            return action.payload;
        },
        clear() {
            return { message: "", kind: "" };
        },
    },
});

const { set, clear } = slice.actions;
let timeout = null;

export const setNotification = (message, kind = "", duration = 5) => {
    return (dispatch) => {
        dispatch(set({ message, kind }));
        clearTimeout(timeout);

        timeout = setTimeout(() => dispatch(clear()), duration * 1000);
    };
};

export default slice.reducer;
