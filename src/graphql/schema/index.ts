import { listResolvers, listTypeDefs } from "./list";
import { taskResolvers, taskTypeDefs } from "./task";
import { userResolvers, userTypeDefs } from "./user";

import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, listTypeDefs, taskTypeDefs],
  resolvers: [userResolvers, listResolvers, taskResolvers],
});

export default schema;
