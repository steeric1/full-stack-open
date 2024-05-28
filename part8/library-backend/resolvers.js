const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const pubSub = new PubSub();

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        async allBooks(_root, args) {
            const author =
                args.author && (await Author.findOne({ name: args.author }));

            const authorCond = author ? { author: author._id } : {};
            const genreCond = args.genre ? { genres: args.genre } : {};

            return Book.find({ ...authorCond, ...genreCond });
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

            pubSub.publish("BOOK_ADDED", { bookAdded: book });
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
    Subscription: {
        bookAdded: {
            subscribe: () => pubSub.asyncIterator("BOOK_ADDED"),
        },
    },
};

module.exports = resolvers;
