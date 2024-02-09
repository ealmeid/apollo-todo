import { QueryResolvers } from "@/graphql/types/server";

export const getListById: QueryResolvers["getListById"] = async (
  _parent,
  { id },
  { prisma, user },
  _info
) => {
  const list = await prisma.list.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!list) {
    throw new Error(`Unable to find list with id: ${id}`);
  }

  return list;
};
