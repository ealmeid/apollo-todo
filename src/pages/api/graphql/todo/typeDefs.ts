import gql from "graphql-tag";

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String!
    isCompleted: Boolean!
  }

  type Mutation {
    createTodo(title: String!): Todo
  }
`;
