import { QueryResolvers } from "@/graphql/types/server";

export const getTasksByUser: QueryResolvers["getTasksByUser"] = async (
  _parent,
  _args,
  { prisma, user },
  _info
) => {
  return await prisma.task.findMany({
    where: {
      userId: user.id,
    },
  });
};
