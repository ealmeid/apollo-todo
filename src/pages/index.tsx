import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

import {
  Button,
  Text,
  Input,
  TaskCard,
  TaskDialog,
  MotionTaskCard,
} from "@/components";
import {
  GetTasksByUserDocument,
  GetTasksByUserQuery,
  useCreateTaskMutation,
  useGetTasksByUserQuery,
} from "@/graphql/types/client";
import { Task } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

export const Home = () => {
  const { isLoaded } = useAuth();
  const [todoValue, setTodoValue] = useState("");
  const [currentTask, setCurrentTask] = useState<
    Pick<Task, "id" | "title" | "createdAt">
  >({
    id: "",
    title: "",
    createdAt: new Date(),
  });

  const { data, loading, refetch, error } = useGetTasksByUserQuery();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch, isLoaded]);

  const [createTodo] = useCreateTaskMutation({
    onCompleted: ({ createTask: task }) => {
      toast.success(`Task \"${task.title}\" has been created!`);
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
      <Image
        className="shadow-2xl"
        src="/logo.png"
        width={50}
        height={50}
        alt="logo"
      />
      <Text as="h1">apollo todo</Text>
      <Text as="lead" className="text-center">
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
            <TaskCard.Skeleton key={i} />
          ))}
        </div>
      )}

      <TaskDialog
        id={currentTask.id}
        name={currentTask.title}
        createdAt={currentTask.createdAt}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />

      {!loading &&
        !error &&
        data &&
        (data?.getTasksByUser.length === 0 ? (
          <Text as="p">No todos yet!</Text>
        ) : (
          <div className="flex flex-col gap-4 max-w-[300px] w-full">
            <AnimatePresence mode={"popLayout"}>
              {data?.getTasksByUser.map((task) => (
                <>
                  <MotionTaskCard
                    onClick={() => {
                      setCurrentTask({
                        id: task.id,
                        title: task.title,
                        createdAt: new Date(task.createdAt),
                      });
                      setIsOpen(true);
                    }}
                    key={task.id}
                    id={task.id}
                    name={task.title}
                    isCompleted={task.isCompleted}
                    layout
                    // initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
                  />
                </>
              ))}
            </AnimatePresence>
          </div>
        ))}
    </div>
  );
};

export default Home;
