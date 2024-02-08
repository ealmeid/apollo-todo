import gql from "graphql-tag";

export const typeDefs = gql`
  type List {
    id: ID!
    title: String!
    taskIds: [ID!]!
  }

  type Query {
    getListsByUser: [List!]!
  }

  type Mutation {
    createList(title: String!): List!
    deleteList(id: ID!): ID!
  }
`;
