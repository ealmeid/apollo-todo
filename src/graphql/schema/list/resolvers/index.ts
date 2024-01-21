import { createList } from "./createList";
import { getListsByUser } from "./getListsByUser";

export const resolvers = {
  Mutation: {
    createList,
  },
  Query: {
    getListsByUser,
  },
};
