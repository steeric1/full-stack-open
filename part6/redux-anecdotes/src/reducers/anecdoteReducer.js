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
        setAnecdotes(state, action) {
            return action.payload;
        },
        appendAnecdote(state, action) {
            return sortAnecdotes(state.concat(action.payload));
        },
    },
});

export const { voteAnecdote, setAnecdotes, appendAnecdote } =
    anecdoteSlice.actions;

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.create(content);
        dispatch(appendAnecdote(anecdote));
    };
};

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export default anecdoteSlice.reducer;
