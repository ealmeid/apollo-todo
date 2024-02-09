import { createList } from "./createList";
import { deleteList } from "./deleteList";
import { editList } from "./editList";
import { getListsByUser } from "./getListsByUser";
import { getListById } from "./getListById";
import { tasks } from "./tasks";

export const resolvers = {
  Mutation: {
    createList,
    deleteList,
    editList,
  },
  Query: {
    getListById,
    getListsByUser,
  },
  List: {
    tasks,
  },
};
