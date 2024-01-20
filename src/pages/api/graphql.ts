import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "@/lib/prisma";

import { schema } from "../../graphql/schema";
import type { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export type ApolloContext = {
  prisma: PrismaClient;
  user: { id: string };
};

const server = new ApolloServer<ApolloContext>({ schema });

export default startServerAndCreateNextHandler(server, {
  // ...

  context: async ({ headers }): Promise<ApolloContext> => {
    const cookies = parse(headers.cookie || "");
    const token = cookies["__session"] ?? "";

    // TODO: Check or use types from clerk if available
    const user = { id: (jwt.decode(token)?.sub as string) ?? "" };

    user.id = (user?.id).split("_")[1];

    return { prisma, user };
  },
});
