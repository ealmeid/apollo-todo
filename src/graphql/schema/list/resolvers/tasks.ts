import { ListResolvers } from "@/graphql/types/server";
import { encodeCursor, decodeCursor } from "../../../helpers";
import { Prisma } from "@prisma/client";

export const tasks: ListResolvers["tasks"] = async (
  _parent,
  { first, after },
  { prisma, user },
  _info
) => {
  let conditions: Prisma.ListInclude["tasks"] = {
    take: first + 1,
    orderBy: {
      task: {
        createdAt: "desc",
      },
    },
    where: {
      AND: [
        {
          task: {
            userId: user.id,
          },
        },
      ],
    },
  };

  if (after) {
    const afterId = decodeCursor(after).id;

    const afterTask = await prisma.task.findUnique({
      where: { id: afterId },
    });

    if (afterTask) {
      conditions.where = {
        AND: [
          ...((conditions?.where?.AND ?? []) as Prisma.TaskToListWhereInput[]),
          {
            task: {
              createdAt: {
                lt: new Date(afterTask.createdAt),
              },
            },
          },
        ],
      };
    }
  }

  const listId = _parent.id;

  const listWithTasks = await prisma.list.findUnique({
    where: {
      id: listId,
      userId: user.id,
    },
    include: {
      tasks: {
        ...conditions,
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

  const hasNextPage = tasksForList.length > first;

  if (tasksForList.length > 1) {
    tasksForList.pop();
  }

  const edges = tasksForList.map((task) => ({
    node: { ...task, createdAt: task.createdAt.toISOString() },
    cursor: encodeCursor(task.id, task.createdAt.toISOString()),
  }));

  const startCursor = edges.length > 0 ? edges[0].cursor : null;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

  return {
    edges,
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage: hasNextPage,
    },
  };
};
