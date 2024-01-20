import { QueryResolvers } from "@/graphql/types/server";
import { Todo } from "@prisma/client";

export const getTodosByUser: QueryResolvers["getTodosByUser"] = (
  _parent,
  _args,
  { prisma, user },
  _info
) => {
  return prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  });
};
