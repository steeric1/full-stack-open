import { useState } from "react";

const NameFilter = ({ filterText, handleTextChange }) => (
    <>
        filter shown with{" "}
        <input
            value={filterText}
            onChange={(event) => handleTextChange(event.target.value)}
        />
    </>
);

const PersonForm = ({ handleSubmit, fields }) => (
    <form
        onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
        }}
    >
        {fields.map((field) => (
            <div key={field.name}>
                {field.name}{" "}
                <input
                    value={field.state}
                    onChange={(event) => field.handleChange(event.target.value)}
                />
            </div>
        ))}

        <input type="submit" value="Add" />
    </form>
);

const Persons = ({ persons }) => (
    <>
        {persons.map((person) => (
            <p key={person.name}>
                {person.name} {person.number}
            </p>
        ))}
    </>
);

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);

    const [nameFilterText, setNameFilterText] = useState("");

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const addPerson = () => {
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
        person.name.toLowerCase().includes(nameFilterText.toLowerCase())
    );

    return (
        <>
            <h2>Phonebook</h2>

            <NameFilter
                filterText={nameFilterText}
                handleTextChange={setNameFilterText}
            />

            <h3>Add a new person</h3>

            <PersonForm
                handleSubmit={addPerson}
                fields={[
                    { name: "name", state: newName, handleChange: setNewName },
                    {
                        name: "number",
                        state: newNumber,
                        handleChange: setNewNumber,
                    },
                ]}
            />

            <h3>Persons</h3>

            <Persons persons={personsToShow} />
        </>
    );
};

export default App;
