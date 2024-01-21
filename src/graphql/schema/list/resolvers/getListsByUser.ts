import { QueryResolvers } from "@/graphql/types/server";
import { List } from "@prisma/client";

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
    return { id: list.id, title: list.title, taskIds };
  });
};
