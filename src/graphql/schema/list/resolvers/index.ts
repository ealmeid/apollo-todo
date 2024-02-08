import { createList } from "./createList";
import { deleteList } from "./deleteList";
import { editList } from "./editList";
import { getListsByUser } from "./getListsByUser";

export const resolvers = {
  Mutation: {
    createList,
    deleteList,
    editList,
  },
  Query: {
    getListsByUser,
  },
};
