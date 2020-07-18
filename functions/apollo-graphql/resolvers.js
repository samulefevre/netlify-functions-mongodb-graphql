const authors = [
  { id: 1, name: "Terry Pratchett", married: false },
  { id: 2, name: "Stephen King", married: true },
  { id: 3, name: "JK Rowling", married: false },
];

module.exports = (db) => ({
  Query: {
    allTodos: async () => await db.collection("todos").find().toArray(),
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    allAuthors: (root, args, context) => {
      return authors;
    },
    author: (root, args, context) => {
      return;
    },
    authorByName: (root, args, context) => {
      console.log("hihhihi", args.name);
      return authors.find((x) => x.name === args.name) || "NOTFOUND";
    },
  },
});
