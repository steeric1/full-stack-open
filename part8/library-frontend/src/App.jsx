import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommend from "./components/Recommend";
import { BOOK_ADDED } from "./queries";

const App = () => {
    const [page, setPage] = useState("authors");
    const [notification, setNotification] = useState("");
    const [token, setToken] = useState(
        localStorage.getItem("libraryUserToken")
    );

    const client = useApolloClient();

    useEffect(() => setPage("authors"), [token]);

    useEffect(() => {
        if (notification) {
            const timeout = setTimeout(() => setNotification(""), 5000);

            return () => clearTimeout(timeout);
        }
    }, [notification]);

    useSubscription(BOOK_ADDED, {
        async onData({ data: { data } }) {
            setNotification(`A new book was added: ${data.bookAdded.title}`);

            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "allBooks" });
                    cache.evict({ fieldName: "allAuthors" });
                },
            });
        },
    });

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>

                {token ? (
                    <>
                        <button onClick={() => setPage("recommend")}>
                            recommend
                        </button>
                        <button onClick={() => setPage("add")}>add book</button>
                        <button onClick={() => logout()}>log out</button>
                    </>
                ) : (
                    <button onClick={() => setPage("login")}>log in</button>
                )}
            </div>

            {notification && <p>{notification}</p>}

            <Authors show={page === "authors"} showForm={!!token} />
            <Books show={page === "books"} />
            <NewBook show={page === "add"} />
            <LoginForm show={page === "login"} setToken={setToken} />
            <Recommend show={page === "recommend"} />
        </div>
    );
};

export default App;
