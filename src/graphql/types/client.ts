import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type List = {
  __typename?: 'List';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createList: Maybe<List>;
  createTodo: Maybe<Todo>;
  createUser: Maybe<User>;
};


export type MutationCreateListArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateTodoArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  clerkId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllLists: Maybe<Array<Maybe<List>>>;
  getTodosByUser: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateTodoMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string } | null };

export type GetTodosByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosByUserQuery = { __typename?: 'Query', getTodosByUser: Array<{ __typename?: 'Todo', id: string, title: string, isCompleted: boolean }> };

export type CreateUserMutationVariables = Exact<{
  clerkId: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } | null };


export const CreateTodoDocument = gql`
    mutation CreateTodo($title: String!) {
  createTodo(title: $title) {
    id
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const GetTodosByUserDocument = gql`
    query GetTodosByUser {
  getTodosByUser {
    id
    title
    isCompleted
  }
}
    `;

/**
 * __useGetTodosByUserQuery__
 *
 * To run a query within a React component, call `useGetTodosByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosByUserQuery, GetTodosByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosByUserQuery, GetTodosByUserQueryVariables>(GetTodosByUserDocument, options);
      }
export function useGetTodosByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosByUserQuery, GetTodosByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosByUserQuery, GetTodosByUserQueryVariables>(GetTodosByUserDocument, options);
        }
export function useGetTodosByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTodosByUserQuery, GetTodosByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTodosByUserQuery, GetTodosByUserQueryVariables>(GetTodosByUserDocument, options);
        }
export type GetTodosByUserQueryHookResult = ReturnType<typeof useGetTodosByUserQuery>;
export type GetTodosByUserLazyQueryHookResult = ReturnType<typeof useGetTodosByUserLazyQuery>;
export type GetTodosByUserSuspenseQueryHookResult = ReturnType<typeof useGetTodosByUserSuspenseQuery>;
export type GetTodosByUserQueryResult = Apollo.QueryResult<GetTodosByUserQuery, GetTodosByUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($clerkId: String!) {
  createUser(clerkId: $clerkId) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      clerkId: // value for 'clerkId'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;