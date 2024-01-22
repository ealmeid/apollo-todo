import { createTask } from "./createTask";
import { getTasksByUser } from "./getTasksByUser";
import { addTasksToLists } from "./addTasksToLists";
import { deleteTask } from "./deleteTask";

export const resolvers = {
  Query: {
    getTasksByUser,
  },
  Mutation: {
    createTask,
    addTasksToLists,
    deleteTask,
  },
};
