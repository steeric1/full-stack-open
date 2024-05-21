import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.anecdotes.filter((a) =>
            a.content.toLowerCase().includes(state.filter)
        )
    );
    const dispatch = useDispatch();

    return anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
                    vote
                </button>
            </div>
        </div>
    ));
};

export default AnecdoteList;
