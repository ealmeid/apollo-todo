import gql from "graphql-tag";

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String!
    isCompleted: Boolean!
  }

  type Query {
    getTodosByUser: [Todo!]!
  }

  type Mutation {
    createTodo(title: String!): Todo
  }
`;
