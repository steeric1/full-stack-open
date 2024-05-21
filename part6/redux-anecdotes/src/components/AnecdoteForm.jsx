import { useDispatch } from "react-redux";

import anecdoteService from "../services/anecdotes";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        const anecdote = await anecdoteService.create(content);
        dispatch(createAnecdote(anecdote));
        dispatch(setNotification(`you created anecdote "${content}"`));
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
