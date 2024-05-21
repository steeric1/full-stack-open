const reducer = (state = "", { type, payload }) => {
    switch (type) {
        case "SET":
            return payload;
        default:
            return state;
    }
};

export const setFilter = (filter) => ({
    type: "SET",
    payload: filter,
});

export default reducer;
