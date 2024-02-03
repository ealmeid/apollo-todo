import { ApolloCache } from "@apollo/client";

export const useDeleteTask = (id: string, cache: ApolloCache<any>) => {
  const cachedTask = cache.identify({
    __typename: "Task",
    id,
  });

  const execute = () =>
    cache.modify({
      fields: {
        getTasksByUser(existingTasks = [], { readField }) {
          return existingTasks.filter(
            (taskRef: any) => id !== readField("id", taskRef)
          );
        },
      },
    });

  const undo = () => {
    console.log("UNDO HERE====", cachedTask);
    cache.modify({
      fields: {
        getTasksByUser(existingTasks = []) {
          return [{ id: cachedTask }, ...existingTasks];
        },
      },
    });
  };

  return { execute, undo };
};
