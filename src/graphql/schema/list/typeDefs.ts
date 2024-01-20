import gql from "graphql-tag";

export const typeDefs = gql`
  type List {
    id: ID!
    name: String!
  }

  type Query {
    getAllLists: [List]
  }

  type Mutation {
    createList(name: String!): List
  }
`;
