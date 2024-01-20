import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "../src/graphql/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: ["./src/pages/**/*.tsx", "./src/pages/**/*.graphql"],
  generates: {
    "src/graphql/types/client.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        avoidOptionals: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
