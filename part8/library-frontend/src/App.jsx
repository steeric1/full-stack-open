import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommend from "./components/Recommend";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(
        localStorage.getItem("libraryUserToken")
    );

    const client = useApolloClient();

    useEffect(() => {
        setPage("authors");
    }, [token]);

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

            <Authors show={page === "authors"} showForm={!!token} />
            <Books show={page === "books"} />
            <NewBook show={page === "add"} />
            <LoginForm show={page === "login"} setToken={setToken} />
            <Recommend show={page === "recommend"} />
        </div>
    );
};

export default App;
