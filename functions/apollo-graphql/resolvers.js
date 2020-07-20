const authors = [
  { id: 1, name: "Terry Pratchett", married: false },
  { id: 2, name: "Stephen King", married: true },
  { id: 3, name: "JK Rowling", married: false },
];

module.exports = (db) => ({
  Query: {
    allTodos: async (_parent, _args, { user }) => {
      if (!user) return [];
      return await db.collection("todos").find().toArray();
    },
    hello: (_root, _args, _context) => {
      return "Hello, world!";
    },
    allAuthors: (_root, _args, _context) => {
      return authors;
    },
    author: (_root, _args, _context) => {
      return;
    },
    authorByName: (_root, args, _context) => {
      console.log("hihhihi", args.name);
      return authors.find((x) => x.name === args.name) || "NOTFOUND";
    },
  },
});
