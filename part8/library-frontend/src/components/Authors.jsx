import { useMutation, useQuery } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import BirthYearForm from "./BirthYearForm";

const Authors = ({ show, showForm }) => {
    const { loading, data } = useQuery(ALL_AUTHORS);
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    if (!show) {
        return null;
    }

    if (loading) return <div>loading...</div>;
    const { allAuthors: authors } = data;

    const handleSetBirthYear = async (name, year) => {
        const { data } = await editAuthor({
            variables: { name, setBornTo: Number(year) },
        });

        if (!data.editAuthor) throw new Error("no author found");
    };

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <BirthYearForm
                    authors={authors}
                    handleSet={handleSetBirthYear}
                />
            )}
        </div>
    );
};

export default Authors;
