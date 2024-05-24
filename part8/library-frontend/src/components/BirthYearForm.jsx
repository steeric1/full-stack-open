import { useState } from "react";

const BirthYearForm = ({ handleSet }) => {
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
                <label htmlFor="name">
                    name{" "}
                    <input
                        id="name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        required
                    />
                </label>
                <br />
                <label htmlFor="born">
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
