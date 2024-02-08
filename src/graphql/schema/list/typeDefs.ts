import gql from "graphql-tag";

export const typeDefs = gql`
  type List {
    id: ID!
    title: String!
    taskIds: [ID!]!
  }

  input EditListInput {
    id: ID!
    title: String
  }

  type Query {
    getListsByUser: [List!]!
  }

  type Mutation {
    createList(title: String!): List!
    deleteList(id: ID!): ID!
    editList(input: EditListInput!): List!
  }
`;
