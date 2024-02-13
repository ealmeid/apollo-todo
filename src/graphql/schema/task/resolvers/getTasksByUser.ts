import { QueryResolvers } from "@/graphql/types/server";
import { encodeCursor, decodeCursor } from "../../../helpers";

export const getTasksByUser: QueryResolvers["getTasksByUser"] = async (
  _parent,
  { first, after, orderBy = "createdAt_desc" },
  { prisma, user },
  _info
) => {
  const [sort, direction] = (orderBy as string).split("_");

  const orderByObj = { [sort]: direction };

  let conditions: any = {
    take: first + 1,
    orderBy: { ...orderByObj },
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
      let andObj: Record<string, any> = {
        createdAt: {
          [direction === "asc" ? "gt" : "lt"]: new Date(afterTask.createdAt),
        },
      };

      conditions.where = {
        AND: [
          ...conditions.where.AND,
          {
            [sort]: {
              ...andObj[sort],
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
