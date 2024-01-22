import React, { useState } from "react";
import {
  useAddTasksToListsMutation,
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

export interface TodoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
}

export const TodoCard = ({ id, name, ...props }: TodoCardProps) => {
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  const [addTaskToLists] = useAddTasksToListsMutation();

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
          key={id}
          className="flex items-center gap-2 w-full px-6 py-4 border-slate-200 border rounded-md min-h-16 hover:bg-slate-50"
        >
          <Checkbox className="w-6 h-6" onClick={(e) => e.stopPropagation()} />
          <div>{name}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-6">
        <div className="flex flex-col gap-6 max-h-[300px] p-4 overflow-y-auto">
          <Text as="h3">{name}</Text>
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
};

// eslint-disable-next-line
TodoCard.Skeleton = () => <Skeleton className="w-full px-6 py-4 min-h-16" />;
