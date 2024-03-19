import gql from "graphql-tag";

export const typeDefs = gql`
  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean
  }
`;
