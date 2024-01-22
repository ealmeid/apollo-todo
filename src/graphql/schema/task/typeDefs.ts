import gql from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    isCompleted: Boolean!
  }

  type Query {
    getTasksByUser: [Task!]!
  }

  type Mutation {
    createTask(title: String!): Task!
    deleteTask(id: ID!): ID!
    addTasksToLists(taskIds: [ID!]!, listIds: [ID!]!): [Task!]!
  }
`;
