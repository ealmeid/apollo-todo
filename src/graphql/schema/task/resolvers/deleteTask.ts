import { MutationResolvers } from "@/graphql/types/server";

export const deleteTask: MutationResolvers["deleteTask"] = async (
  _parent,
  { id },
  { prisma, user },
  _info
) => {
  const { id: userId } = user;

  await prisma
    .$transaction([
      prisma.taskToList.deleteMany({
        where: {
          taskId: id,
        },
      }),
      prisma.task.delete({
        where: {
          id,
          userId,
        },
      }),
    ])
    .catch((err) => {
      throw new Error(`Unable to delete task: ${err}`);
    });

  return id;
};
