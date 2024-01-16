import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
  }

  type Mutation {
    createUser(clerkId: String!): User
  }
`;
