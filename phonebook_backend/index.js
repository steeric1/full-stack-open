require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
    morgan((tokens, req, res) => {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
            req.method === "POST" ? JSON.stringify(req.body) : "",
        ].join(" ");
    })
);

const Person = require("./models/person");

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (_, res) => {
    Person.find({}).then((persons) => res.json(persons));
});

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
        .then((person) => {
            person ? res.json(person) : res.status(404).end();
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({
            error: "missing field(s), name and number must be provided",
        });
    }

    const person = new Person({
        id: Math.floor(Math.random() * 1e15),
        name,
        number,
    });

    person
        .save()
        .then((savedPerson) => {
            res.status(201).json(savedPerson);
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    const { name, number } = req.body;

    const updated = {
        name,
        number,
    };

    Person.findByIdAndUpdate(id, updated, { new: true })
        .then((updated) => res.json(updated))
        .catch((error) => next(error));
});

app.get("/info", (_, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `);
});

const unknownEndpointHandler = (_, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpointHandler);

const errorHandler = (error, _, res, next) => {
    console.error("error:", error.message);

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformed id" });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
