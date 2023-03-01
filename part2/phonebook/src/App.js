import { useEffect, useState } from "react";
import axios from "axios";

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
    const [persons, setPersons] = useState([]);

    const [nameFilterText, setNameFilterText] = useState("");

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data);
        });
    }, []);

    const addPerson = () => {
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };

        axios
            .post("http://localhost:3001/persons", newPerson)
            .then((response) => {
                setPersons([...persons, response.data]);

                setNewName("");
                setNewNumber("");
            });
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
