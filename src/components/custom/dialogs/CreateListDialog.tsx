import { useState, useEffect, ReactNode } from "react";
import {
  Button,
  Label,
  Input,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { useCreateListMutation } from "@/graphql/types/client";
import { Loader2 } from "lucide-react";

interface CreateListDialogProps {
  open?: boolean;
  onClose?: () => void;
  trigger?: ReactNode;
}

export const CreateListDialog: React.FC<CreateListDialogProps> = ({
  open = false,
  onClose = () => {},
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const close = () => setIsOpen(false);
  const [createList, { loading }] = useCreateListMutation({
    update: (cache, { data }) => {
      const newList = data?.createList;
      if (data?.createList) {
        cache.modify({
          fields: {
            getListsByUser(existingLists = []) {
              return [newList, ...existingLists];
            },
          },
        });
      }
    },
    onCompleted: () => {
      close();
    },
  });
  const [listTitle, setListTitle] = useState<string>("");

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      {trigger && (
        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        className="sm:max-w-[425px] rounded-md"
        onEscapeKeyDown={close}
        onInteractOutside={close}
      >
        <DialogHeader>
          <DialogTitle>Create List</DialogTitle>
          <DialogDescription>Create a new list 🎉</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Chores"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() =>
              createList({
                variables: {
                  title: listTitle,
                },
              })
            }
          >
            {loading ? (
              <Loader2
                className="animate-spin"
                size={24}
                stroke="currentColor"
              />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
