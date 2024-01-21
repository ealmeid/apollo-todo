import { createTask } from "./createTask";
import { getTasksByUser } from "./getTasksByUser";
import { addTasksToLists } from "./addTasksToLists";

export const resolvers = {
  Query: {
    getTasksByUser,
  },
  Mutation: {
    createTask,
    addTasksToLists,
  },
};
