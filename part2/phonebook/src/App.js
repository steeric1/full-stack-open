import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);

    const [nameFilter, setNameFilter] = useState("");

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPerson = { name: newName, number: newNumber };
        setPersons([...persons, newPerson]);

        setNewName("");
        setNewNumber("");
    };

    let personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    return (
        <>
            <h2>Phonebook</h2>

            <div>
                filter shown with{" "}
                <input
                    value={nameFilter}
                    onChange={(event) => setNameFilter(event.target.value)}
                />
            </div>

            <h2>add a new</h2>

            <form onSubmit={addPerson}>
                <div>
                    name:{" "}
                    <input
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                    />
                </div>
                <div>
                    number:{" "}
                    <input
                        value={newNumber}
                        onChange={(event) => setNewNumber(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>

            {personsToShow.map((person) => (
                <p key={person.name}>
                    {person.name} {person.number}
                </p>
            ))}
        </>
    );
};

export default App;
