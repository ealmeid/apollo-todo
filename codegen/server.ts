import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "../src/graphql/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  generates: {
    "src/graphql/types/server.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-resolvers"],
      config: {
        contextType: "../../pages/api/graphql#ApolloContext",
      },
    },
  },
};

export default config;
