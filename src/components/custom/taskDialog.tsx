import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  useAddTasksToListsMutation,
  useDeleteTaskMutation,
  useGetListsByUserQuery,
} from "@/graphql/types/client";
import { Dialog, DialogContent, Button, Text } from "..";

interface TaskDialogProps {
  id: string;
  name: string;
  open?: boolean;
  onClose?: () => void;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  id,
  name,
  open = false,
  onClose = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const { data } = useGetListsByUserQuery({
    onCompleted: ({ getListsByUser }) => {
      const listIds = getListsByUser
        .filter((list) => list.taskIds.includes(id))
        .map((list) => list.id);
      setSelectedLists(listIds);
    },
  });

  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  const [deleteTask] = useDeleteTaskMutation({
    variables: {
      id,
    },
    update(cache) {
      cache.evict({ id: cache.identify({ __typename: "Task", id }) });
    },
  });

  const [addTaskToLists] = useAddTasksToListsMutation();

  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-6" onBlur={() => onClose()}>
        <div className="flex flex-col gap-6 max-h-[300px] p-4 overflow-y-auto">
          <Text as="h3">{name}</Text>
          {/* Use the description provided by the task later */}
          <Text as="muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            aliquid incidunt natus sint nemo error quasi consequuntur, explicabo
            neque aperiam eveniet placeat aliquam, non ducimus praesentium id
            assumenda tempora optio.
          </Text>
          {/* {data?.getListsByUser.map((list) => (
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
            ))} */}
        </div>
        <div className="flex gap-2">
          <Button
            className="min-w-1/2 w-full"
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

          <Button
            className="min-w-1/2 w-full flex gap-2"
            variant="destructive"
            onClick={() => deleteTask()}
          >
            <Trash2 className="w-4 h-4">Delete Task</Trash2>
            Delete Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
