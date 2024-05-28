const BookTable = ({ books, genre = "" }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books
                    .filter((book) =>
                        genre ? book.genres.includes(genre) : true
                    )
                    .map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default BookTable;
