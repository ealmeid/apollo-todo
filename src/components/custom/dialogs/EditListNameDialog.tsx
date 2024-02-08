import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks";
import { useEditListMutation } from "@/graphql/types/client";
import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui";
import { toast } from "sonner";

interface DialogProps {
  open?: boolean;
  listId: string;
  currentTitle: string;
  onClose?: () => void;
}

export const EditListNameDialog: React.FC<DialogProps> = ({
  open = false,
  listId,
  currentTitle,
  onClose = () => {},
}) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const close = () => {
    setIsOpen(false);
    onClose();
  };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onOpenChange = (open: boolean) => {
    if (!open) close();
  };

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[425px]"
          onEscapeKeyDown={close}
          onInteractOutside={close}
        >
          <DialogHeader>
            <DialogTitle>Edit List Name</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <EditListNameForm
            listId={listId}
            currentTitle={currentTitle}
            onSave={close}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent onEscapeKeyDown={close} onInteractOutside={close}>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <EditListNameForm
          listId={listId}
          currentTitle={currentTitle}
          onSave={close}
          className="px-4"
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function EditListNameForm({
  listId,
  currentTitle,
  className,
  onSave = () => {},
}: React.ComponentProps<"form"> & {
  listId: string;
  currentTitle: string;
  onSave?: () => void;
}) {
  const [newTitle, setNewTitle] = React.useState(currentTitle);
  const [editList] = useEditListMutation({});

  return (
    <div className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          defaultValue={currentTitle}
          onChange={(e) => setNewTitle(e.currentTarget.value)}
        />
      </div>
      <Button
        disabled={currentTitle === newTitle}
        onClick={() =>
          editList({
            onCompleted: () => {
              toast.success("List updated!");
              onSave();
            },
            onError: () => {
              toast.error("An error occurred.");
            },
            variables: {
              input: {
                id: listId,
                title: newTitle,
              },
            },
          })
        }
      >
        Save changes
      </Button>
    </div>
  );
}
