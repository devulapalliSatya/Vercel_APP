const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const { typeDefs } = require('./graphql/schema');
const resolvers = require('./graphql/resolver');
const { PORT } = require("./config/config");
const { default: expressPlayground } = require('graphql-playground-middleware-express');
class App {
    async startServer() {
        try {
            const app = express();
            app.use("/graphql", graphqlHTTP((req) => ({
                schema: typeDefs,
                rootValue: resolvers,
                graphiql: true
            })));
            app.get("/", expressPlayground({ endpoint: "/graphql" }));
            app.listen({ port: PORT }, () => {
                console.log(`Server running at :${PORT}`);
            });
        } catch (error) {
            console.log("Internal Server Error", error);
        }
    }
}
new App().startServer();

