import { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";
import BookTable from "./BookTable";

const Books = ({ show }) => {
    const [genre, setGenre] = useState("");

    const all = useQuery(ALL_BOOKS);
    const withGenre = useQuery(ALL_BOOKS, {
        variables: { genre },
        skip: !genre,
    });

    if (!show) return null;
    if (all.loading || withGenre.loading) return <div>loading...</div>;

    const genres = all.data.allBooks.reduce((genres, book) => {
        book.genres.forEach(
            (genre) => !genres.includes(genre) && genres.push(genre)
        );

        return genres;
    }, []);

    const { allBooks: books } = genre ? withGenre.data : all.data;
    return (
        <div>
            <h2>books</h2>
            <div>
                {genre ? (
                    <>
                        in genre <strong>{genre}</strong>
                    </>
                ) : (
                    <>all genres</>
                )}
            </div>

            <BookTable books={books} genre={genre} />

            <div>
                <h3>filter genre</h3>
                <button onClick={() => setGenre("")}>all genres</button>
                {genres.map((genre) => (
                    <button key={genre} onClick={() => setGenre(genre)}>
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Books;
