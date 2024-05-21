import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import { getAnecdotes } from "./requests";

const App = () => {
    const handleVote = (anecdote) => {
        console.log("vote");
    };

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAnecdotes,
        retry: 1,
    });

    if (result.isLoading) {
        return <div>Loading...</div>;
    }

    if (result.isError) {
        return (
            <div>anecdote service not available due to problems in server</div>
        );
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            <AnecdoteList anecdotes={anecdotes} />
        </div>
    );
};

export default App;
