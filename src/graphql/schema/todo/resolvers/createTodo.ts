import { MutationResolvers } from "@/graphql/types/server";

export const createTodo: MutationResolvers["createTodo"] = async (
  _parent,
  { title },
  { prisma, user },
  _info
) => {
  const { id: userId } = user;

  const todo = await prisma.todo.create({
    data: {
      userId,
      title,
      description: "description",
      isCompleted: false,
    },
  });

  return todo;
};
