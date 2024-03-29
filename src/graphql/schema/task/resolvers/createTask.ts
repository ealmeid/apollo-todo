import { MutationResolvers } from "@/graphql/types/server";

export const createTask: MutationResolvers["createTask"] = async (
  _parent,
  { title },
  { prisma, user },
  _info
) => {
  const { id: userId } = user;

  const task = await prisma.task.create({
    data: {
      userId,
      title,
      description: "description",
      isCompleted: false,
    },
  });

  return task;
};
