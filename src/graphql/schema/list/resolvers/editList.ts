import { MutationResolvers } from "@/graphql/types/server";
import * as z from "zod";

export const editList: MutationResolvers["editList"] = async (
  _parent,
  { input },
  { prisma, user },
  _info
) => {
  const { id: userId } = user;
  const { id, ...dataToUpdate } = input;

  const inputSchema = z.object({
    title: z.string().min(4).optional(),
    description: z.string().min(4).optional(),
    emoji: z.string().min(1).optional(),
  });

  const validatedInput = inputSchema.parse(dataToUpdate);

  const list = await prisma.list.update({
    where: {
      id: input.id,
      userId,
    },
    data: {
      ...validatedInput,
    },
  });

  return list;
};
