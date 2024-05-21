import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) =>
        state.anecdotes.filter((a) =>
            a.content.toLowerCase().includes(state.filter)
        )
    );

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id));
        dispatch(setNotification(`you voted "${anecdote.content}"`));
    };

    return anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    ));
};

export default AnecdoteList;
