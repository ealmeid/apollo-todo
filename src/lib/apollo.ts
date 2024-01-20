import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  type ApolloClientOptions,
  type NormalizedCacheObject,
} from "@apollo/client";

export const createApolloClient = (
  opts?: ApolloClientOptions<NormalizedCacheObject>
) => {
  // TODO: make the url environment specific
  const httpLink = createHttpLink({
    uri: "http://localhost:3000/api/graphql",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ...opts,
  });
};
