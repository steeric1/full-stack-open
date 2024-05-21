import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
