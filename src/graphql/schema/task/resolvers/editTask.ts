import { MutationResolvers } from "@/graphql/types/server";
import * as z from "zod";

export const editTask: MutationResolvers["editTask"] = async (
  _parent,
  { input },
  { prisma, user },
  _info
) => {
  const { id: userId } = user;
  const { id, ...dataToUpdate } = input;

  const inputSchema = z.object({
    title: z.string().min(4).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
  });

  const validatedInput = inputSchema.parse(dataToUpdate);

  const todo = await prisma.task.update({
    where: {
      id: input.id,
      userId,
    },
    data: {
      ...validatedInput,
    },
  });

  return todo;
};
