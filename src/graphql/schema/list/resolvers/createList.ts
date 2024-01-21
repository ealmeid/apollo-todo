import { MutationResolvers } from "@/graphql/types/server";

export const createList: MutationResolvers["createList"] = async (
  _parent,
  { title },
  context,
  _info
) => {
  const { id: userId } = context.user;

  const list = await context.prisma.list.create({
    data: {
      title,
      userId,
    },
  });

  return { ...list, taskIds: [] };
};
