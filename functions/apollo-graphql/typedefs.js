const { gql } = require("apollo-server-lambda")

module.exports = gql`
  type Query {
    hello: String
    allAuthors: [Author!]
    author(id: Int!): Author
    authorByName(name: String!): Author
    allTodos: [Todo!]
  }
  type Author {
    id: ID!
    name: String!
    married: Boolean!
  }
  type Todo {
    _id: ID!
    title: String!
    completed: Boolean!
  }
`