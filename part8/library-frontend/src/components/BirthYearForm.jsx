import { useState } from "react";

const BirthYearForm = ({ authors, handleSet }) => {
    const [name, setName] = useState("");
    const [born, setBorn] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await handleSet(name, born);
            setError("");
            setName("");
            setBorn("");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <div>
            <h3>set birthyear</h3>
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
            <form onSubmit={handleSubmit}>
                <label>
                    name{" "}
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        required
                    >
                        <option value="">-</option>
                        {authors.map((a) => (
                            <option key={a.id} value={a.name}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    born{" "}
                    <input
                        type="number"
                        id="born"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                        required
                    />
                </label>
                <br />
                <button>update author</button>
            </form>
        </div>
    );
};

export default BirthYearForm;
