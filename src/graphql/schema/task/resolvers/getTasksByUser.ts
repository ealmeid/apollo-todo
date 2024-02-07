import { QueryResolvers } from "@/graphql/types/server";
import { encodeCursor, decodeCursor } from "../../../helpers";

export const getTasksByUser: QueryResolvers["getTasksByUser"] = async (
  _parent,
  { first, after },
  { prisma, user },
  _info
) => {
  let conditions: any = {
    take: first + 1,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      AND: [{ userId: user.id }],
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
          ...conditions.where.AND,
          {
            createdAt: {
              lt: new Date(afterTask.createdAt),
            },
          },
        ],
      };
    }
  }

  const tasks = await prisma.task.findMany({ ...conditions });

  const edges = tasks.map((task) => ({
    node: { ...task, createdAt: task.createdAt.toISOString() },
    cursor: encodeCursor(task.id, task.createdAt.toISOString()),
  }));

  const startCursor = edges.length > 0 ? edges[0].cursor : null;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
  const hasNextPage = tasks.length > first;

  return {
    edges,
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage: hasNextPage,
    },
  };
};
