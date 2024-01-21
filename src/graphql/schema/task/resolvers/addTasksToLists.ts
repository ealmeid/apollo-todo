import { MutationResolvers } from "@/graphql/types/server";

export const addTasksToLists: MutationResolvers["addTasksToLists"] = async (
  _parent,
  { taskIds, listIds },
  { prisma, user },
  _info
) => {
  for (const taskId of taskIds) {
    for (const listId of listIds) {
      const existingConnection = await prisma.task.findFirst({
        where: {
          id: taskId,
          lists: {
            some: {
              listId,
            },
          },
        },
      });

      if (!existingConnection) {
        await prisma.task.update({
          where: { id: taskId },
          data: {
            lists: {
              create: [
                {
                  list: {
                    connect: { id: listId },
                  },
                },
              ],
            },
          },
        });
      }
    }
  }

  return [];
};
