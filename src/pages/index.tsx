import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import {
  Button,
  Text,
  Input,
  TaskCard,
  TaskModal,
  MotionTaskCard,
  LoadMoreButton,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components";
import {
  GetTasksByUserQueryResult,
  TaskOrderBy,
  useCreateTaskMutation,
  useGetTasksByUserQuery,
} from "@/graphql/types/client";
import { Task } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { ArrowDown, ArrowUp, LayoutList, XCircle } from "lucide-react";
import { debounce } from "lodash";

type GetTasksByUserData = NonNullable<
  GetTasksByUserQueryResult["data"]
>["getTasksByUser"];

export const Home = () => {
  const { isLoaded } = useAuth();
  const [isLoadingMore] = useState(false);
  const [todoValue, setTodoValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<TaskOrderBy>(
    TaskOrderBy.CreatedatDesc
  );
  const [currentTask, setCurrentTask] = useState<
    Pick<Task, "id" | "title" | "createdAt">
  >({
    id: "",
    title: "",
    createdAt: new Date(),
  });

  const LIMIT = 3;

  const onChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSetSearchTerm = debounce(onChange, 1500);

  const { data, loading, refetch, fetchMore, error } = useGetTasksByUserQuery({
    variables: {
      first: LIMIT,
      orderBy: sortOrder,
      filterBy: {
        title: searchTerm,
      },
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data?.getTasksByUser?.edges.length === 0) {
      refetch();
    }
  }, [data, refetch, isLoaded]);

  const [createTodo] = useCreateTaskMutation({
    onCompleted: ({ createTask: task }) => {
      toast.success(`Task \"${task.title}\" has been created!`);
    },
    update(cache, { data }) {
      const newTask = data?.createTask;

      if (!newTask) return;

      cache.modify({
        fields: {
          getTasksByUser(existing) {
            return {
              ...(existing as GetTasksByUserData),
              edges: [
                { node: { ...newTask } },
                ...((existing as GetTasksByUserData)?.edges ?? []),
              ],
            };
          },
        },
      });
    },
  });

  return (
    <div className="items-center flex flex-col gap-8 m-auto mt-24 pb-12">
      <Image
        className="shadow-2xl"
        src="/logo.png"
        width={50}
        height={50}
        alt="logo"
      />
      <Text as="h1">apollo-todo</Text>
      <Text as="lead" className="text-center">
        Add, Edit, Manage, and Complete.
      </Text>

      <TaskModal
        id={currentTask.id}
        name={currentTask.title}
        createdAt={currentTask.createdAt}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="flex flex-col gap-4 max-w-[300px] w-full">
        <div className="flex gap-2">
          <Input
            value={todoValue}
            onChange={(e) => setTodoValue(e.currentTarget.value)}
            placeholder="Pick up pasta..."
          />
          <Button
            disabled={!!error || loading || !todoValue}
            className="inline-flex animate-shimmer items-center justify-center rounded-md border bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
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

        {error && (
          <div className="flex items-center align-middle gap-4 justify-center p-4 border border-red-500 rounded-md">
            <XCircle className="text-red-500" />
            <Text as="p" className="text-red-500 !m-0">
              An error as occurred
            </Text>
          </div>
        )}

        {loading && (
          <div className="flex flex-col gap-4 max-w-[300px] w-full">
            {Array.from({ length: 3 }, (_, i) => (
              <TaskCard.Skeleton key={i} />
            ))}
          </div>
        )}

        {!loading &&
          !error &&
          data &&
          (data?.getTasksByUser?.edges.length === 0 ? (
            <div className="flex gap-4 justify-center align-middle items-center border p-4 rounded-md">
              <LayoutList className="w-4 h-4" />
              <Text as="p" className="!m-0">
                No tasks yet!
              </Text>
            </div>
          ) : (
            <>
              <div className="flex gap-4">
                <Input
                  placeholder="Search..."
                  onChange={debouncedSetSearchTerm}
                />
                <Select
                  onValueChange={(val) => setSortOrder(val as TaskOrderBy)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="mr-auto">
                    <SelectItem value={TaskOrderBy.CreatedatDesc}>
                      <div className="flex items-center gap-2 mr-auto">
                        <ArrowUp className="w-4 h-4" />
                        Newest
                      </div>
                    </SelectItem>
                    <SelectItem value={TaskOrderBy.CreatedatAsc}>
                      <div className="flex items-center gap-2 mr-auto">
                        <ArrowDown className="w-4 h-4" />
                        Oldest
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Text as="muted">
                Showing {data?.getTasksByUser?.edges.length} of{" "}
                {data?.getTasksByUser?.totalCount}
              </Text>
              {data?.getTasksByUser?.edges.map(({ node: task }) => (
                <MotionTaskCard
                  layout
                  key={task.id}
                  id={task.id}
                  name={task.title}
                  isCompleted={task.isCompleted}
                  onClick={() => {
                    setCurrentTask({
                      id: task.id,
                      title: task.title,
                      createdAt: new Date(task?.createdAt),
                    });
                    setIsOpen(true);
                  }}
                />
              ))}
            </>
          ))}
      </div>

      {data?.getTasksByUser?.pageInfo?.hasNextPage && !isLoadingMore && (
        <LoadMoreButton
          onLoadMore={() =>
            fetchMore({
              variables: {
                after: data?.getTasksByUser?.pageInfo?.endCursor,
                first: LIMIT,
              },
            })
          }
        />
      )}
    </div>
  );
};

export default Home;
