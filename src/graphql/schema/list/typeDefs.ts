import gql from "graphql-tag";

export const typeDefs = gql`
  type List {
    id: ID!
    title: String!
    description: String!
    emoji: String!
    tasks(first: Int!, after: String): TaskConnection
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input EditListInput {
    id: ID!
    title: String
    description: String
    emoji: String
  }

  type Query {
    getListById(id: ID!): List
    getListsByUser: [List!]!
  }

  type Mutation {
    createList(title: String!): List!
    deleteList(id: ID!): ID!
    editList(input: EditListInput!): List!
  }
`;
