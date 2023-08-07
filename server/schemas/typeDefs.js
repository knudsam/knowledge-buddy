const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Collection {
    type: String!
    books: [Book]!
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    collections: [Collection]
  }

  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToCollection(collection: String!, book: BookInput!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    searchBooks(query: String!): [Book]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      authors: [String]
      description: String!
      bookId: String!
      image: String
      link: String
      title: String!
    ): User
    removeBook(bookId: String!): User
    saveBookToWishlist(book: BookInput!): User
    addToCurrentlyReading(book: BookInput!): User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;
