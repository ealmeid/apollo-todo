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
  /** DateTime custom scalar type */
  DateTime: { input: any; output: any; }
};

export type EditListInput = {
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type List = {
  __typename?: 'List';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  tasks?: Maybe<TaskConnection>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type ListTasksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTasksToLists: Array<Task>;
  createList: List;
  createTask: Task;
  createUser?: Maybe<User>;
  deleteList: Scalars['ID']['output'];
  deleteTask: Scalars['ID']['output'];
  editList: List;
  editTask: Task;
};


export type MutationAddTasksToListsArgs = {
  listIds: Array<Scalars['ID']['input']>;
  taskIds: Array<Scalars['ID']['input']>;
};


export type MutationCreateListArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  clerkId: Scalars['String']['input'];
};


export type MutationDeleteListArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditListArgs = {
  input: EditListInput;
};


export type MutationEditTaskArgs = {
  input: EditTaskInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getListById?: Maybe<List>;
  getListsByUser: Array<List>;
  getTaskById?: Maybe<Task>;
  getTasksByUser?: Maybe<TaskConnection>;
};


export type QueryGetListByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTasksByUserArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<TaskFilters>;
  first: Scalars['Int']['input'];
  orderBy?: InputMaybe<TaskOrderBy>;
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type TaskConnection = {
  __typename?: 'TaskConnection';
  edges: Array<TaskEdge>;
  pageInfo?: Maybe<PageInfo>;
};

export type TaskEdge = {
  __typename?: 'TaskEdge';
  cursor: Scalars['String']['output'];
  node: Task;
};

export type TaskFilters = {
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum TaskOrderBy {
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateListMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'List', id: string, title: string } };

export type EditListMutationVariables = Exact<{
  input: EditListInput;
}>;


export type EditListMutation = { __typename?: 'Mutation', editList: { __typename?: 'List', id: string, title: string } };

export type DeleteListMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList: string };

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, isCompleted: boolean, createdAt: string } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: string };

export type AddTasksToListsMutationVariables = Exact<{
  taskIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  listIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AddTasksToListsMutation = { __typename?: 'Mutation', addTasksToLists: Array<{ __typename?: 'Task', id: string, title: string, isCompleted: boolean }> };

export type EditTaskMutationVariables = Exact<{
  input: EditTaskInput;
}>;


export type EditTaskMutation = { __typename?: 'Mutation', editTask: { __typename?: 'Task', id: string, title: string, isCompleted: boolean, description: string } };

export type CreateUserMutationVariables = Exact<{
  clerkId: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };

export type GetListsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListsByUserQuery = { __typename?: 'Query', getListsByUser: Array<{ __typename?: 'List', id: string, title: string }> };

export type GetTasksByUserQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<TaskOrderBy>;
  filterBy?: InputMaybe<TaskFilters>;
}>;


export type GetTasksByUserQuery = { __typename?: 'Query', getTasksByUser?: { __typename?: 'TaskConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'Task', id: string, title: string, isCompleted: boolean, createdAt: string } }>, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type GetListByIdWithTasksQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListByIdWithTasksQuery = { __typename?: 'Query', getListById?: { __typename?: 'List', id: string, title: string, createdAt: any, tasks?: { __typename?: 'TaskConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'Task', id: string, title: string, description: string, isCompleted: boolean } }>, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null } | null };


export const CreateListDocument = gql`
    mutation CreateList($title: String!) {
  createList(title: $title) {
    id
    title
  }
}
    `;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const EditListDocument = gql`
    mutation EditList($input: EditListInput!) {
  editList(input: $input) {
    id
    title
  }
}
    `;
export type EditListMutationFn = Apollo.MutationFunction<EditListMutation, EditListMutationVariables>;

/**
 * __useEditListMutation__
 *
 * To run a mutation, you first call `useEditListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editListMutation, { data, loading, error }] = useEditListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditListMutation(baseOptions?: Apollo.MutationHookOptions<EditListMutation, EditListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditListMutation, EditListMutationVariables>(EditListDocument, options);
      }
export type EditListMutationHookResult = ReturnType<typeof useEditListMutation>;
export type EditListMutationResult = Apollo.MutationResult<EditListMutation>;
export type EditListMutationOptions = Apollo.BaseMutationOptions<EditListMutation, EditListMutationVariables>;
export const DeleteListDocument = gql`
    mutation DeleteList($id: ID!) {
  deleteList(id: $id)
}
    `;
export type DeleteListMutationFn = Apollo.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, options);
      }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!) {
  createTask(title: $title) {
    id
    title
    isCompleted
    createdAt
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const AddTasksToListsDocument = gql`
    mutation AddTasksToLists($taskIds: [ID!]!, $listIds: [ID!]!) {
  addTasksToLists(taskIds: $taskIds, listIds: $listIds) {
    id
    title
    isCompleted
  }
}
    `;
export type AddTasksToListsMutationFn = Apollo.MutationFunction<AddTasksToListsMutation, AddTasksToListsMutationVariables>;

/**
 * __useAddTasksToListsMutation__
 *
 * To run a mutation, you first call `useAddTasksToListsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTasksToListsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTasksToListsMutation, { data, loading, error }] = useAddTasksToListsMutation({
 *   variables: {
 *      taskIds: // value for 'taskIds'
 *      listIds: // value for 'listIds'
 *   },
 * });
 */
export function useAddTasksToListsMutation(baseOptions?: Apollo.MutationHookOptions<AddTasksToListsMutation, AddTasksToListsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTasksToListsMutation, AddTasksToListsMutationVariables>(AddTasksToListsDocument, options);
      }
export type AddTasksToListsMutationHookResult = ReturnType<typeof useAddTasksToListsMutation>;
export type AddTasksToListsMutationResult = Apollo.MutationResult<AddTasksToListsMutation>;
export type AddTasksToListsMutationOptions = Apollo.BaseMutationOptions<AddTasksToListsMutation, AddTasksToListsMutationVariables>;
export const EditTaskDocument = gql`
    mutation EditTask($input: EditTaskInput!) {
  editTask(input: $input) {
    id
    title
    isCompleted
    description
  }
}
    `;
export type EditTaskMutationFn = Apollo.MutationFunction<EditTaskMutation, EditTaskMutationVariables>;

/**
 * __useEditTaskMutation__
 *
 * To run a mutation, you first call `useEditTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTaskMutation, { data, loading, error }] = useEditTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTaskMutation(baseOptions?: Apollo.MutationHookOptions<EditTaskMutation, EditTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTaskMutation, EditTaskMutationVariables>(EditTaskDocument, options);
      }
export type EditTaskMutationHookResult = ReturnType<typeof useEditTaskMutation>;
export type EditTaskMutationResult = Apollo.MutationResult<EditTaskMutation>;
export type EditTaskMutationOptions = Apollo.BaseMutationOptions<EditTaskMutation, EditTaskMutationVariables>;
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
export const GetListsByUserDocument = gql`
    query GetListsByUser {
  getListsByUser {
    id
    title
  }
}
    `;

/**
 * __useGetListsByUserQuery__
 *
 * To run a query within a React component, call `useGetListsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetListsByUserQuery, GetListsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListsByUserQuery, GetListsByUserQueryVariables>(GetListsByUserDocument, options);
      }
export function useGetListsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListsByUserQuery, GetListsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListsByUserQuery, GetListsByUserQueryVariables>(GetListsByUserDocument, options);
        }
export function useGetListsByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListsByUserQuery, GetListsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListsByUserQuery, GetListsByUserQueryVariables>(GetListsByUserDocument, options);
        }
export type GetListsByUserQueryHookResult = ReturnType<typeof useGetListsByUserQuery>;
export type GetListsByUserLazyQueryHookResult = ReturnType<typeof useGetListsByUserLazyQuery>;
export type GetListsByUserSuspenseQueryHookResult = ReturnType<typeof useGetListsByUserSuspenseQuery>;
export type GetListsByUserQueryResult = Apollo.QueryResult<GetListsByUserQuery, GetListsByUserQueryVariables>;
export const GetTasksByUserDocument = gql`
    query GetTasksByUser($first: Int!, $after: String, $orderBy: TaskOrderBy, $filterBy: TaskFilters) {
  getTasksByUser(
    first: $first
    after: $after
    orderBy: $orderBy
    filterBy: $filterBy
  ) {
    edges {
      node {
        id
        title
        isCompleted
        createdAt
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useGetTasksByUserQuery__
 *
 * To run a query within a React component, call `useGetTasksByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksByUserQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      orderBy: // value for 'orderBy'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useGetTasksByUserQuery(baseOptions: Apollo.QueryHookOptions<GetTasksByUserQuery, GetTasksByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksByUserQuery, GetTasksByUserQueryVariables>(GetTasksByUserDocument, options);
      }
export function useGetTasksByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksByUserQuery, GetTasksByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksByUserQuery, GetTasksByUserQueryVariables>(GetTasksByUserDocument, options);
        }
export function useGetTasksByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTasksByUserQuery, GetTasksByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksByUserQuery, GetTasksByUserQueryVariables>(GetTasksByUserDocument, options);
        }
export type GetTasksByUserQueryHookResult = ReturnType<typeof useGetTasksByUserQuery>;
export type GetTasksByUserLazyQueryHookResult = ReturnType<typeof useGetTasksByUserLazyQuery>;
export type GetTasksByUserSuspenseQueryHookResult = ReturnType<typeof useGetTasksByUserSuspenseQuery>;
export type GetTasksByUserQueryResult = Apollo.QueryResult<GetTasksByUserQuery, GetTasksByUserQueryVariables>;
export const GetListByIdWithTasksDocument = gql`
    query GetListByIdWithTasks($id: ID!, $first: Int!, $after: String) {
  getListById(id: $id) {
    id
    title
    createdAt
    tasks(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          isCompleted
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
    `;

/**
 * __useGetListByIdWithTasksQuery__
 *
 * To run a query within a React component, call `useGetListByIdWithTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListByIdWithTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListByIdWithTasksQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetListByIdWithTasksQuery(baseOptions: Apollo.QueryHookOptions<GetListByIdWithTasksQuery, GetListByIdWithTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListByIdWithTasksQuery, GetListByIdWithTasksQueryVariables>(GetListByIdWithTasksDocument, options);
      }
export function useGetListByIdWithTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListByIdWithTasksQuery, GetListByIdWithTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListByIdWithTasksQuery, GetListByIdWithTasksQueryVariables>(GetListByIdWithTasksDocument, options);
        }
export function useGetListByIdWithTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListByIdWithTasksQuery, GetListByIdWithTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListByIdWithTasksQuery, GetListByIdWithTasksQueryVariables>(GetListByIdWithTasksDocument, options);
        }
export type GetListByIdWithTasksQueryHookResult = ReturnType<typeof useGetListByIdWithTasksQuery>;
export type GetListByIdWithTasksLazyQueryHookResult = ReturnType<typeof useGetListByIdWithTasksLazyQuery>;
export type GetListByIdWithTasksSuspenseQueryHookResult = ReturnType<typeof useGetListByIdWithTasksSuspenseQuery>;
export type GetListByIdWithTasksQueryResult = Apollo.QueryResult<GetListByIdWithTasksQuery, GetListByIdWithTasksQueryVariables>;