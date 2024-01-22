import { useState } from "react";
import { Button, Text, Input, TodoCard, MotionTodoCard } from "@/components";
import {
  GetTasksByUserDocument,
  GetTasksByUserQuery,
  useCreateTaskMutation,
  useGetTasksByUserQuery,
} from "@/graphql/types/client";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export const Home = () => {
  const [todoValue, setTodoValue] = useState("");

  const { data, loading, error } = useGetTasksByUserQuery();

  const [createTodo] = useCreateTaskMutation({
    onCompleted: ({ createTask: task }) => {
      toast(`Task \"${task.title}\" has been created!`);
    },
    update(cache, { data }) {
      const newTodo = data?.createTask;
      const existingTasks = cache.readQuery<GetTasksByUserQuery>({
        query: GetTasksByUserDocument,
      });

      const newArr = [newTodo, ...(existingTasks?.getTasksByUser ?? [])];

      cache.writeQuery({
        query: GetTasksByUserDocument,
        data: {
          getTasksByUser: newArr,
        },
      });
    },
  });

  return (
    <div className="items-center flex flex-col gap-8 m-auto mt-24">
      <Text as="h1">apollo todo</Text>
      <Text as="lead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <div className="flex gap-2">
        <Input
          value={todoValue}
          onChange={(e) => setTodoValue(e.currentTarget.value)}
          placeholder="Pick up pasta..."
        />
        <Button
          onClick={() => {
            createTodo({
              variables: {
                title: todoValue,
              },
            });
          }}
        >
          Add
        </Button>
      </div>
      {loading && (
        <div className="flex flex-col gap-4 max-w-[300px] w-full">
          {Array.from({ length: 3 }, (_, i) => (
            <TodoCard.Skeleton key={i} />
          ))}
        </div>
      )}

      {!loading &&
        !error &&
        data &&
        (data?.getTasksByUser.length === 0 ? (
          <Text as="p">No todos yet!</Text>
        ) : (
          <div className="flex flex-col gap-4 max-w-[300px] w-full">
            <AnimatePresence mode={"popLayout"}>
              {data?.getTasksByUser.map((todo) => (
                <MotionTodoCard
                  key={todo.id}
                  id={todo.id}
                  name={todo.title}
                  layout
                  // initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring" }}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
    </div>
  );
};

export default Home;
