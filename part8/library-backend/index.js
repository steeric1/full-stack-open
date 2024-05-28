const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
    ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { GraphQLError } = require("graphql");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const cors = require("cors");
const http = require("http");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Configure and connect Mongoose
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to MongoDB!"))
    .catch((error) =>
        console.error("failed to connect to MongoDB:", error.message)
    );

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/",
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                serverWillStart: async () => ({
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                }),
            },
        ],
    });

    await server.start();
    app.use(
        "/",
        cors(),
        express.json(),
        expressMiddleware(server, {
            async context({ req }) {
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
        })
    );

    const PORT = 4000;
    httpServer.listen(PORT, () =>
        console.log(`Server is ready at http://localhost:${PORT}`)
    );
};

start();
