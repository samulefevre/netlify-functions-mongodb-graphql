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
      const {
        identity,
        user
      } = context.clientContext;
      console.log('context', context)
      console.log('user', user)
      if (identity) {
        return {
          user: user,
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
    server.createHandler({
      cors: {
        origin: '*',
        credentials: true
      } 
    }

    )(event, context, cb);
  });
};
