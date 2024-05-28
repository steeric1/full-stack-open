import { useQuery } from "@apollo/client";

import { ALL_BOOKS, ME } from "../queries";
import BookTable from "./BookTable";

const Recommend = ({ show }) => {
    const me = useQuery(ME);
    const favoriteGenre = me.data?.me?.favoriteGenre;

    const books = useQuery(ALL_BOOKS, {
        skip: !favoriteGenre,
        variables: { genre: favoriteGenre },
    });

    if (!show) return null;
    if (me.loading || books.loading) return <div>loading...</div>;

    const { allBooks: favoriteBooks } = books.data;
    return (
        <div>
            <h2>recommendations</h2>
            <div>
                books in your favorite genre <strong>{favoriteGenre}</strong>
            </div>

            <BookTable books={favoriteBooks} />
        </div>
    );
};

export default Recommend;
