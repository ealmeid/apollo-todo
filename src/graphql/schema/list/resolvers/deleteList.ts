import { MutationResolvers } from "@/graphql/types/server";

export const deleteList: MutationResolvers["deleteList"] = async (
  _parent,
  { id },
  context,
  _info
) => {
  const { id: userId } = context.user;

  const list = await context.prisma.list.delete({
    where: {
      id,
      userId,
    },
  });

  return list.id;
};
