import { createList } from "./createList";
import { deleteList } from "./deleteList";
import { getListsByUser } from "./getListsByUser";

export const resolvers = {
  Mutation: {
    createList,
    deleteList,
  },
  Query: {
    getListsByUser,
  },
};
