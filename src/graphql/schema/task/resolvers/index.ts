import { createTask } from "./createTask";
import { getTasksByUser } from "./getTasksByUser";
import { addTasksToLists } from "./addTasksToLists";
import { deleteTask } from "./deleteTask";
import { getTaskById } from "./getTaskById";
import { editTask } from "./editTask";

export const resolvers = {
  TaskOrderBy: {
    CREATEDAT_ASC: "createdAt_asc",
    CREATEDAT_DESC: "createdAt_desc",
  },
  Query: {
    getTasksByUser,
    getTaskById,
  },
  Mutation: {
    createTask,
    addTasksToLists,
    deleteTask,
    editTask,
  },
};
