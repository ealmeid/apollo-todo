import React, { useState } from "react";
import {
  useAddTasksToListsMutation,
  useDeleteTaskMutation,
  useGetListsByUserQuery,
} from "@/graphql/types/client";
import {
  Checkbox,
  Skeleton,
  Dialog,
  DialogTrigger,
  DialogContent,
  Button,
  Text,
} from "..";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export interface TodoCardProps {
  id: string;
  name: string;
}

// eslint-disable-next-line
const TodoCardComponent = React.forwardRef<HTMLDivElement, TodoCardProps>(
  ({ id, name, ...props }, ref) => {
    const [selectedLists, setSelectedLists] = useState<string[]>([]);

    const [addTaskToLists] = useAddTasksToListsMutation();

    const [deleteTask] = useDeleteTaskMutation({
      variables: {
        id,
      },
      update(cache) {
        cache.evict({ id: cache.identify({ __typename: "Task", id }) });
      },
    });

    const { data } = useGetListsByUserQuery({
      onCompleted: ({ getListsByUser }) => {
        const listIds = getListsByUser
          .filter((list) => list.taskIds.includes(id))
          .map((list) => list.id);
        setSelectedLists(listIds);
      },
    });

    return (
      <Dialog>
        <DialogTrigger>
          <div
            ref={ref}
            key={id}
            className="bg-slate-100 flex items-center gap-2 w-full px-6 py-4 border-slate-200 border rounded-md min-h-16 hover:bg-slate-50"
          >
            <Checkbox
              className="w-6 h-6"
              onClick={(e) => e.stopPropagation()}
            />
            <div>{name}</div>
          </div>
        </DialogTrigger>
        <DialogContent className="p-6">
          <div className="flex flex-col gap-6 max-h-[300px] p-4 overflow-y-auto">
            <Text as="h3">{name}</Text>
            <Button
              variant="destructive"
              className="flex gap-2"
              onClick={() => deleteTask()}
            >
              <Trash2 className="w-4 h-4">Delete Task</Trash2>
              Delete Task
            </Button>
            <Text as="p">Created:</Text>
            {data?.getListsByUser.map((list) => (
              <div
                key={list.id}
                className="shadow-md p-4 flex items-center gap-6 rounded-md"
              >
                {list.title}
                <Checkbox
                  checked={selectedLists.includes(list.id)}
                  onClick={() => setSelectedLists([...selectedLists, list.id])}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={() => {
              addTaskToLists({
                variables: {
                  taskIds: [id],
                  listIds: selectedLists,
                },
              });
            }}
          >
            Add Tasks to Lists
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
);

export const MotionTodoCard = motion(TodoCardComponent);

export const TodoCard = TodoCardComponent as React.ForwardRefExoticComponent<
  TodoCardProps & React.RefAttributes<HTMLDivElement>
> & {
  Skeleton: React.FC;
};

// eslint-disable-next-line
TodoCard.Skeleton = () => <Skeleton className="w-full px-6 py-4 min-h-16" />;
