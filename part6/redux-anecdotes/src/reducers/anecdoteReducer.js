import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

const sortAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes);
};

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            const id = action.payload;
            return sortAnecdotes(
                state.map((anecdote) =>
                    anecdote.id === id
                        ? { ...anecdote, votes: anecdote.votes + 1 }
                        : anecdote
                )
            );
        },
        createAnecdote(state, action) {
            return sortAnecdotes(state.concat(action.payload));
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
    anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export default anecdoteSlice.reducer;
