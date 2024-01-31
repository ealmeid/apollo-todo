import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "@/lib/prisma";

import { schema } from "../../graphql/schema";
import type { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { parse } from "cookie";

export type ApolloContext = {
  prisma: PrismaClient;
  user: { id: string };
};

const server = new ApolloServer<ApolloContext>({ schema });

const checkToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  if (decoded && (decoded.exp as number) * 1000 < Date.now()) {
    return "";
  }
  return token;
};

export default startServerAndCreateNextHandler(server, {
  // ...

  context: async ({ headers }): Promise<ApolloContext> => {
    const cookies = parse(headers.cookie || "");
    const token = cookies["__session"] ?? "";

    const user: { id: string } = { id: "" };

    const validToken = checkToken(token);

    if (validToken) {
      const subValue = (jwt.decode(validToken)?.sub as string) ?? "";
      user.id = subValue.split("_")[1] ?? "";
    }

    return { prisma, user };
  },
});
