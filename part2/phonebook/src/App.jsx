import { useEffect, useState } from "react";
import axios from "axios";

import personService from "./services/persons";

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

const Persons = ({ persons, removePerson }) => (
    <>
        {persons.map((person) => (
            <p key={person.id}>
                {person.name} {person.number}{" "}
                <button onClick={() => removePerson(person.id)}>remove</button>
            </p>
        ))}
    </>
);

const Notification = ({ message, isError }) =>
    message && (
        <div className={`notification ${isError ? "error" : ""}`}>
            {message}
        </div>
    );

const App = () => {
    const [persons, setPersons] = useState([]);

    const [nameFilterText, setNameFilterText] = useState("");

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const [notification, setNotification] = useState({
        message: "",
        isError: false,
    });

    useEffect(() => {
        personService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons));
    }, []);

    const notifyUser = (message, isError = false) => {
        setNotification({ message, isError });

        setTimeout(() => {
            setNotification({ message: "", isError: false });
        }, 4000);
    };

    const addPerson = () => {
        // If a person with the given name already exists, prompt to update the number
        let old = persons.find((person) => person.name === newName);
        if (
            old &&
            window.confirm(
                `${newName} is already added to phonebook, update the number?`
            )
        ) {
            personService
                .update(old.id, { ...old, number: newNumber })
                .then((returnedPerson) => {
                    setPersons(
                        persons.map((person) =>
                            person.id === returnedPerson.id
                                ? returnedPerson
                                : person
                        )
                    );

                    notifyUser(`Successfully updated number for ${old.name}!`);
                })
                .catch((error) => {
                    setPersons(
                        persons.filter((person) => person.id !== old.id)
                    );

                    notifyUser(
                        error.response.status === 404
                            ? `${newName} was already removed from the server`
                            : "An unknown error occurred",
                        true
                    );
                })
                .finally(() => {
                    setNewName("");
                    setNewNumber("");
                });

            return;
        }

        // Generate an id that doesn't already exist
        let id = persons.length + 1;
        while (persons.find((person) => person.id === id)) {
            ++id;
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id,
        };

        personService.create(newPerson).then((returnedPerson) => {
            setPersons([...persons, returnedPerson]);

            notifyUser(`Successfully added ${returnedPerson.name}!`);

            setNewName("");
            setNewNumber("");
        });
    };

    const removePerson = (id) => {
        let person = persons.find((person) => person.id === id);
        if (
            window.confirm(`Are you certain you want to remove ${person.name}?`)
        ) {
            personService
                .remove(id)
                .then(() => {
                    notifyUser(`Successfully removed ${person.name}!`);
                })
                .catch((error) => {
                    notifyUser(
                        error.response.status === 404
                            ? `${person.name} was already removed from the server`
                            : "An unknown error occurred",
                        true
                    );
                })
                .finally(() =>
                    setPersons(persons.filter((person) => person.id !== id))
                );
        }
    };

    let personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(nameFilterText.toLowerCase())
    );

    return (
        <>
            <h2>Phonebook</h2>

            <Notification
                message={notification.message}
                isError={notification.isError}
            />

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

            <Persons persons={personsToShow} removePerson={removePerson} />
        </>
    );
};

export default App;
