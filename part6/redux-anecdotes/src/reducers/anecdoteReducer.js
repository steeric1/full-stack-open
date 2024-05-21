import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

const sortAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes);
};

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        replaceAnecdote(state, action) {
            return sortAnecdotes(
                state.map((anecdote) =>
                    anecdote.id === action.payload.id
                        ? action.payload
                        : anecdote
                )
            );
        },
        setAnecdotes(state, action) {
            return sortAnecdotes(action.payload);
        },
        appendAnecdote(state, action) {
            return sortAnecdotes(state.concat(action.payload));
        },
    },
});

const { setAnecdotes, appendAnecdote, replaceAnecdote } = anecdoteSlice.actions;

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

export const voteAnecdote = (id) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.vote(id);
        dispatch(replaceAnecdote(anecdote));
    };
};

export default anecdoteSlice.reducer;
