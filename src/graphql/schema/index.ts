import { customResolvers, customTypeDefs } from "./custom";
import { listResolvers, listTypeDefs } from "./list";
import { taskResolvers, taskTypeDefs } from "./task";
import { userResolvers, userTypeDefs } from "./user";

import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, listTypeDefs, taskTypeDefs, customTypeDefs],
  resolvers: [userResolvers, listResolvers, taskResolvers, customResolvers],
});

export default schema;
