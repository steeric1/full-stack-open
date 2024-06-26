import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteList = ({ anecdotes }) => {
    const queryClient = useQueryClient();
    const notifDispatch = useNotificationDispatch();

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess(updatedAnecdote) {
            const anecdotes = queryClient.getQueryData(["anecdotes"]);
            queryClient.setQueryData(
                ["anecdotes"],
                anecdotes.map((a) =>
                    a.id === updatedAnecdote.id ? updatedAnecdote : a
                )
            );

            notifDispatch({
                type: "SET",
                payload: `you voted "${updatedAnecdote.content}"`,
            });
        },
    });

    const handleVote = (anecdote) => {
        voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    };

    return anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <Anecdote anecdote={anecdote} handleVote={handleVote} />
        </div>
    ));
};

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </>
    );
};

export default AnecdoteList;
