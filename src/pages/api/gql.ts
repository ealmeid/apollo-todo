import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "@/lib/prisma";

import { schema } from "./graphql";

const server = new ApolloServer({ schema });

export default startServerAndCreateNextHandler(server, {
  context: async ({ headers }) => {
    const token = headers.authorization?.replace("Bearer ", "");

    return { prisma, token };
  },
});
