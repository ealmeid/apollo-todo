import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  useAddTasksToListsMutation,
  useDeleteTaskMutation,
  useGetListsByUserQuery,
} from "@/graphql/types/client";
import { Dialog, DialogContent, Button, Text } from "..";
import { toast } from "sonner";
import { useDeleteTask } from "@/lib/apollo";
import { useApolloClient } from "@apollo/client";

interface TaskDetails {
  id: string;
  name: string;
  createdAt: Date;
}

interface TaskDialogProps extends TaskDetails {
  open?: boolean;
  onClose?: () => void;
}

export const TaskModal: React.FC<TaskDialogProps> = ({
  id,
  name,
  open = false,
  onClose = () => {},
}) => {
  const apolloClient = useApolloClient();
  const [isOpen, setIsOpen] = useState(open);
  const { execute, undo } = useDeleteTask(id, apolloClient.cache);

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

  const [deleteTask] = useDeleteTaskMutation();

  const [addTaskToLists] = useAddTasksToListsMutation();

  return (
    <Dialog open={isOpen} modal>
      <DialogContent
        className="p-6 rounded-md"
        onEscapeKeyDown={onClose}
        onInteractOutside={onClose}
      >
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
            onClick={() => {
              onClose();

              execute();

              const deleteTaskTimeout = setTimeout(() => {
                deleteTask({
                  variables: {
                    id,
                  },
                  optimisticResponse: {
                    deleteTask: id,
                  },
                });
              }, 4000);

              const deletedTaskToastId = toast.info(
                <div>
                  Task {name} has been deleted!{" "}
                  <a
                    className="underline cursor-pointer"
                    onClick={() => {
                      clearTimeout(deleteTaskTimeout);
                      toast.dismiss(deletedTaskToastId);
                      undo();
                    }}
                  >
                    Undo
                  </a>
                </div>
              );
            }}
          >
            <Trash2 className="w-4 h-4">Delete Task</Trash2>
            Delete Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
