import { QueryResolvers } from "@/graphql/types/server";

export const getListsByUser: QueryResolvers["getListsByUser"] = async (
  _parent,
  _args,
  { prisma, user },
  _info
) => {
  const allLists = await prisma.list.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tasks: {
        select: {
          taskId: true,
        },
      },
    },
  });

  return allLists.map((list: (typeof allLists)[0]) => {
    const taskIds = list.tasks.map((task) => task.taskId);

    /* INFO:

    We need to destructure tasks out of the current list because we have
    a separate resolver for tasks. We don't want to include tasks in the
    response otherwise the generated types will error out.

    */

    const { tasks, ...listWithoutTasks } = list;
    return { ...listWithoutTasks, taskIds };
  });
};
