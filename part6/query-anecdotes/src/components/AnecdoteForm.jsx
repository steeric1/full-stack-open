import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const notifDispatch = useNotificationDispatch();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess(newAnecdote) {
            const anecdotes = queryClient.getQueryData(["anecdotes"]);
            queryClient.setQueryData(
                ["anecdotes"],
                anecdotes.concat(newAnecdote)
            );

            notifDispatch({
                type: "SET",
                payload: `you created anecdote: "${newAnecdote.content}"`,
            });
        },
        onError({ response }) {
            notifDispatch({
                type: "SET",
                payload: response.data.error,
            });
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        newAnecdoteMutation.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
