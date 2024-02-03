import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  type ApolloClientOptions,
  type NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: any;

export const createApolloClient = (
  opts?: ApolloClientOptions<NormalizedCacheObject>
) => {
  const isProduction = process.env.NODE_ENV === "production";
  const rootUrl = isProduction
    ? "http://apollo-todo.vercel.app"
    : "http://localhost:3000";

  if (apolloClient) return apolloClient;

  const httpLink = createHttpLink({
    uri: `${rootUrl}/api/graphql`,
  });

  apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ...opts,
  });

  return apolloClient;
};

export * from "./hooks";
