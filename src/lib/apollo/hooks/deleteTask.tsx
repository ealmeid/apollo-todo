import { ApolloCache } from "@apollo/client";

export const useDeleteTask = (id: string, cache: ApolloCache<any>) => {
  const cachedTask = cache.identify({
    __typename: "Task",
    id,
  });

  let indexOfTask = -1;

  const execute = () =>
    cache.modify({
      fields: {
        getTasksByUser(existing = {}, { readField }) {
          const existingEdges = existing.edges ?? [];

          indexOfTask = existingEdges.findIndex(
            ({ node: taskRef }: any) => id === readField("id", taskRef)
          );

          const filteredEdges = existingEdges.filter(
            ({ node: taskRef }: any) => id !== readField("id", taskRef)
          );

          return {
            ...existing,
            edges: filteredEdges,
          };
        },
      },
    });

  const undo = () => {
    cache.modify({
      fields: {
        getTasksByUser(existing = {}) {
          const existingEdges = existing.edges ?? [];

          const start = existingEdges.slice(0, indexOfTask);
          const end = existingEdges.slice(indexOfTask);

          return {
            ...existing,
            edges: [...start, { node: cachedTask }, ...end],
          };
        },
      },
    });
  };

  return { execute, undo };
};
