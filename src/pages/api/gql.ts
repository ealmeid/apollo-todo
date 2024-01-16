import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { schema } from "./graphql";

const prisma = new PrismaClient();

const server = new ApolloServer({ schema });

export default startServerAndCreateNextHandler(server, {
  context: async ({ headers }) => {
    const token = headers.authorization?.replace("Bearer ", "");

    return { prisma, token };
  },
});
