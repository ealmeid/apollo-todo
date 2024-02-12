import gql from "graphql-tag";

export const typeDefs = gql`
  type List {
    id: ID!
    title: String!
    tasks(first: Int!, after: String): TaskConnection
    createdAt: String!
    updatedAt: String!
  }

  input EditListInput {
    id: ID!
    title: String
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
