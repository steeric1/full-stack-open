import { createSlice } from "@reduxjs/toolkit";

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
            const anecdote = {
                content: action.payload,
                votes: 0,
            };

            return sortAnecdotes(state.concat(anecdote));
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
    anecdoteSlice.actions;
export default anecdoteSlice.reducer;
