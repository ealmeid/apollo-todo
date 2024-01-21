import { QueryResolvers } from "@/graphql/types/server";

export const getTasksByUser: QueryResolvers["getTasksByUser"] = (
  _parent,
  _args,
  { prisma, user },
  _info
) => {
  return prisma.task.findMany({
    where: {
      userId: user.id,
    },
  });
};
