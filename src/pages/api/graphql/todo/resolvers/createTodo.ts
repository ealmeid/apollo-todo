import { PrismaClient } from "@prisma/client";

export const createTodo = async (
  _parent: any,
  args: any,
  context: any,
  _info: any
) => {
  const { id: userId } = context.user;

  const prisma = new PrismaClient();

  const todo = await prisma.todo.create({
    data: {
      userId,
      title: args.title,
      description: "description",
      isCompleted: false,
    },
  });

  return todo;
};
