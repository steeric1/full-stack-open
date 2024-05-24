const { v1: uuid } = require("uuid");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to MongoDB!"))
    .catch((error) =>
        console.error("failed to connect to MongoDB:", error.message)
    );

const typeDefs = `
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        async allBooks(_root, { author, genre }) {
            const books = await Book.find({});
            const filtered = books.filter((book) => {
                if (author && book.author.name !== author) return false;
                if (genre && !book.genres.includes(genre)) return false;

                return true;
            });

            return filtered;
        },
        allAuthors: async () => Author.find({}),
        me: (_root, _args, { currentUser }) => currentUser,
    },
    Book: {
        author: async (root) => Author.findById(root.author),
    },
    Author: {
        async bookCount({ name }) {
            const author = await Author.find({ name });
            const books = await Book.find({ author });
            return books.length;
        },
    },
    Mutation: {
        async addBook(_root, args, { currentUser }) {
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            let author = await Author.findOne({ name: args.author });

            if (!author) {
                const authorDoc = new Author({ name: args.author });
                try {
                    author = await authorDoc.save();
                } catch (error) {
                    throw new GraphQLError("Saving author failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.author,
                            error,
                        },
                    });
                }
            }

            const book = new Book({ ...args, author: author._id });
            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError("Saving book failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title,
                        error,
                    },
                });
            }

            return book;
        },
        async editAuthor(_root, { name, setBornTo }, { currentUser }) {
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const author = await Author.findOne({ name });
            if (!author) {
                throw new GraphQLError("Author not found", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: name,
                    },
                });
            }

            author.born = setBornTo;

            try {
                await author.save();
            } catch (error) {
                throw new GraphQLError("Saving author failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: name,
                        error,
                    },
                });
            }

            return author;
        },
        async createUser(_root, args) {
            const user = new User(args);

            try {
                await user.save();
            } catch (error) {
                throw new GraphQLError("Saving user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.username,
                        error,
                    },
                });
            }

            return user;
        },
        async login(_root, { username, password }) {
            const user = await User.findOne({ username });
            if (!user || password !== "very secret") {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req && req.headers.authorization;
        if (auth && auth.startsWith("Bearer ")) {
            try {
                const { id } = jwt.verify(
                    auth.replace("Bearer ", ""),
                    process.env.JWT_SECRET
                );

                const currentUser = await User.findById(id);
                return { currentUser };
            } catch (error) {
                throw new GraphQLError("Invalid token", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});