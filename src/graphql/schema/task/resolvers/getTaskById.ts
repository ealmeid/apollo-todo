import { QueryResolvers } from "@/graphql/types/server";

export const getTaskById: QueryResolvers["getTaskById"] = async (
  _parent,
  { id },
  { prisma, user },
  _info
) => {
  const task = await prisma.task
    .findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    })
    .catch(() => {
      throw new Error(`Unable to find task with id: ${id}`);
    });

  return task;
};
