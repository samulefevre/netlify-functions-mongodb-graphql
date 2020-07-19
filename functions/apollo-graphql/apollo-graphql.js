const { ApolloServer, gql } = require("apollo-server-lambda");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const connectToMongoDB = require("./db");

exports.handler = async function (event, context) {
  const db = await connectToMongoDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(db),
    context: ({ context }) => {
      if (context.clientContext.user) {
        return {
          user: context.clientContext.user.sub,
        };
      } else {
        return {};
      }
    },
    playground: true,
    introspection: true,
  });
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};
