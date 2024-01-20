import { listResolvers, listTypeDefs } from "./list";
import { todoResolvers, todoTypeDefs } from "./todo";
import { userResolvers, userTypeDefs } from "./user";

import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, listTypeDefs, todoTypeDefs],
  resolvers: [userResolvers, listResolvers, todoResolvers],
});

export default schema;
