export const createList = async (
  _parent: any,
  args: any,
  context: any,
  _info: any
) => {
  const { id: userId } = context.user;

  const list = await context.prisma.list.create({
    data: {
      name: args.name,
      userId,
    },
  });

  return list;
};
