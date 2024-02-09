import { ListResolvers } from "@/graphql/types/server";

export const tasks: ListResolvers["tasks"] = async (
  _parent,
  _args,
  { prisma, user },
  _info
) => {
  const listId = _parent.id;
  const listWithTasks = await prisma.list.findUnique({
    where: {
      id: listId,
      userId: user.id,
    },
    include: {
      tasks: {
        select: {
          task: true,
        },
      },
    },
  });

  if (!listWithTasks) {
    throw new Error("Unable to find tasks");
  }

  const tasksForList = listWithTasks.tasks.map(({ task }) => task);

  return tasksForList;
};
