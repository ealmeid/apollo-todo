import { GraphQLScalarType } from "graphql";

export const dateTimeResolver = new GraphQLScalarType({
  name: "DateTime",
  description: "DateTime custom scalar type",
  serialize(value) {
    return value as string;
  },
});
