import { createTodo } from "./createTodo";
import { getTodosByUser } from "./getTodosByUser";

export const resolvers = {
  Query: {
    getTodosByUser,
  },
  Mutation: {
    createTodo,
  },
};
