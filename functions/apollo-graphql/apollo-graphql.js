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
      console.log('context here', context)
      if (context.clientContext.user) {
        console.log('context.clientContext')
        console.log(context.clientContext)
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
    server.createHandler({
      cors: {
        origin: '*',
        credentials: true
      } 
    }

    )(event, context, cb);
  });
};
