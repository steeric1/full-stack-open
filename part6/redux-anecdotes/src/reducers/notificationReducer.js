import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
    },
});

let timeout = null;

export const setNotification = (message, duration = 5) => {
    return (dispatch) => {
        dispatch(notificationSlice.actions.setNotification(message));

        // clear previous timeout
        clearTimeout(timeout);

        timeout = setTimeout(
            () => dispatch(notificationSlice.actions.setNotification("")),
            duration * 1000
        );
    };
};

export default notificationSlice.reducer;
