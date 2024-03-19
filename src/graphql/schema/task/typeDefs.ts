import gql from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    isCompleted: Boolean!
    createdAt: DateTime!
  }

  enum TaskOrderBy {
    CREATEDAT_ASC
    CREATEDAT_DESC
  }

  input TaskFilters {
    title: String
    isCompleted: Boolean
  }

  input EditTaskInput {
    id: ID!
    title: String
    description: String
    isCompleted: Boolean
  }

  type Query {
    getTaskById(id: ID!): Task
    getTasksByUser(
      first: Int!
      after: String
      orderBy: TaskOrderBy
      filterBy: TaskFilters
    ): TaskConnection
  }

  type Mutation {
    createTask(title: String!): Task!
    deleteTask(id: ID!): ID!
    addTasksToLists(taskIds: [ID!]!, listIds: [ID!]!): [Task!]!
    editTask(input: EditTaskInput!): Task!
  }

  type TaskConnection {
    edges: [TaskEdge!]!
    pageInfo: PageInfo
    totalCount: Int!
  }

  type TaskEdge {
    node: Task!
    cursor: String!
  }
`;
