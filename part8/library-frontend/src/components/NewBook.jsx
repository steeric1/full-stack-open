import { useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_BOOK, ALL_AUTHORS } from "../queries";

const NewBook = (props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const client = useApolloClient();

    const [createBook] = useMutation(ADD_BOOK, {
        refetchQueries: [ALL_AUTHORS],
        async onCompleted() {
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "allBooks" });
                },
            });
        },
    });

    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();

        createBook({
            variables: { title, published: Number(published), author, genres },
        });

        setTitle("");
        setPublished("");
        setAuthor("");
        setGenres([]);
        setGenre("");
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        required
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        required
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(" ")}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
