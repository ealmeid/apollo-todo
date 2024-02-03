import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "../src/graphql/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: ["./src/graphql/**/*.tsx", "./src/graphql/**/*.graphql"],
  generates: {
    "src/graphql/types/client.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        avoidOptionals: {
          inputValue: false,
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
