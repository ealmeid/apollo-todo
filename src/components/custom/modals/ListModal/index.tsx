import { useEffect, useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { useGetListByIdWithTasksQuery } from "@/graphql/types/client";
import { Dialog, DialogContent, Text, Separator, Checkbox } from "../../..";
import dayjs from "dayjs";
import { useAuth } from "@clerk/nextjs";

interface ListDialogProps {
  id: string;
  open?: boolean;
  onClose?: () => void;
}

export const ListModal: React.FC<ListDialogProps> = ({
  id,
  open = false,
  onClose = () => {},
}) => {
  const { isLoaded } = useAuth();
  const [isOpen, setIsOpen] = useState(open);
  const { data, refetch, loading, error } = useGetListByIdWithTasksQuery({
    variables: {
      id,
      first: 2,
    },
  });

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [data, isLoaded, refetch]);

  return (
    <Dialog open={isOpen} modal>
      <DialogContent
        className="p-8 rounded-md"
        onEscapeKeyDown={onClose}
        onInteractOutside={onClose}
      >
        {loading && <Loader2 className="animate-spin h-8 w-8 m-auto" />}

        {data && !error && (
          <>
            <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto">
              <Text as="h3">{data.getListById?.title}</Text>
              <div className="flex gap-2 items-center">
                <Calendar className="w-4 h-4" />
                <Text as="muted">
                  {dayjs(parseInt(data.getListById?.createdAt ?? "")).format(
                    "MMMM D, YYYY"
                  )}
                </Text>
              </div>
              <Text as="muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                aliquid incidunt natus sint nemo error quasi consequuntur,
                explicabo neque aperiam eveniet placeat aliquam, non ducimus
                praesentium id assumenda tempora optio.
              </Text>
            </div>
            <Separator className="my-2" />
            <Text as="h4">Tasks</Text>
            {data?.getListById?.tasks?.edges.length === 0 && (
              <Text as="muted">No tasks found</Text>
            )}
            {data?.getListById?.tasks?.edges.map(({ node: task }) => (
              <div
                key={task.id}
                className="flex items-center rounded-md bg-slate-100 px-4 p-2 gap-4 max-w-[50%] border"
              >
                <Checkbox className="w-5 h-5" checked={task.isCompleted} />
                <div>{task.title}</div>
              </div>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
