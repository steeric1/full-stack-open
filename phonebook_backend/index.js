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
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((p) => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((p) => p.id !== id);

    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({
            error: "missing field(s), name and number must be provided",
        });
    } else if (persons.find((p) => p.name === name)) {
        return res.status(400).json({
            error: "name must be unique",
        });
    }

    const person = {
        id: Math.floor(Math.random() * 1e15),
        name,
        number,
    };

    persons.push(person);

    res.json(person);
    res.status(201).end();
});

app.get("/info", (_, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
