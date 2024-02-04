import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../../pages/api/graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type EditTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['ID']['output'];
  taskIds: Array<Scalars['ID']['output']>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTasksToLists: Array<Task>;
  createList: List;
  createTask: Task;
  createUser?: Maybe<User>;
  deleteTask: Scalars['ID']['output'];
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


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditTaskArgs = {
  input: EditTaskInput;
};

export type Query = {
  __typename?: 'Query';
  getListsByUser: Array<List>;
  getTaskById?: Maybe<Task>;
  getTasksByUser: Array<Task>;
};


export type QueryGetTaskByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['String']['output'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  EditTaskInput: EditTaskInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  List: ResolverTypeWrapper<List>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  EditTaskInput: EditTaskInput;
  ID: Scalars['ID']['output'];
  List: List;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Task: Task;
  User: User;
};

export type ListResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  taskIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addTasksToLists?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationAddTasksToListsArgs, 'listIds' | 'taskIds'>>;
  createList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationCreateListArgs, 'title'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'title'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'clerkId'>>;
  deleteTask?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  editTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationEditTaskArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getListsByUser?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType>;
  getTaskById?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryGetTaskByIdArgs, 'id'>>;
  getTasksByUser?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
};

export type TaskResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

