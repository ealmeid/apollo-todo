import gql from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    isCompleted: Boolean!
    createdAt: String!
  }

  input EditTaskInput {
    id: ID!
    title: String
    description: String
    isCompleted: Boolean
  }

  type Query {
    getTaskById(id: ID!): Task
    getTasksByUser: [Task!]!
  }

  type Mutation {
    createTask(title: String!): Task!
    deleteTask(id: ID!): ID!
    addTasksToLists(taskIds: [ID!]!, listIds: [ID!]!): [Task!]!
    editTask(input: EditTaskInput!): Task!
  }
`;
