import { createTask } from "./createTask";
import { getTasksByUser } from "./getTasksByUser";
import { addTasksToLists } from "./addTasksToLists";
import { deleteTask } from "./deleteTask";
import { getTaskById } from "./getTaskById";

export const resolvers = {
  Query: {
    getTasksByUser,
    getTaskById,
  },
  Mutation: {
    createTask,
    addTasksToLists,
    deleteTask,
  },
};
