export const createUser = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const user = { id: args.clerkId };

  await context.prisma.user.create({
    data: { ...user },
  });

  return user;
};
