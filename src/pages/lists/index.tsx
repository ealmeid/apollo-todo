import { useState, useEffect } from "react";
import {
  Text,
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ListCard,
  CreateListDialog,
} from "@/components";
import {
  useDeleteListMutation,
  useGetListsByUserQuery,
} from "@/graphql/types/client";
import { List, ListPlus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { EditListNameDialog } from "@/components/custom/dialogs/EditListNameDialog";
import { ListModal } from "@/components/custom/modals/ListModal";

export const Manage = () => {
  const { isLoaded } = useAuth();
  const { data, refetch } = useGetListsByUserQuery();
  const [currentList, setCurrentList] = useState<{ id: string; title: string }>(
    { id: "", title: "" }
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [deleteList] = useDeleteListMutation({
    onCompleted: () => {
      toast.success("List deleted successfully");
    },
    update(cache, { data }) {
      const deletedListId = data?.deleteList;
      if (deletedListId) {
        cache.modify({
          fields: {
            getListsByUser(existingLists = [], { readField }) {
              return existingLists.filter(
                (listRef: any) => deletedListId !== readField("id", listRef)
              );
            },
          },
        });
      }
    },
  });

  useEffect(() => {
    if (data?.getListsByUser?.length === 0) {
      refetch();
    }
  }, [data, refetch, isLoaded]);

  return (
    <div className="items-center flex flex-col gap-8 m-auto mt-24 max-w-[900px] pb-12">
      <div className="flex flex-col gap-6 mr-auto">
        <div className="flex gap-4 items-center">
          <List className="h-6 w-6" />
          <Text as="h1" className="!text-4xl">
            Your Lists
          </Text>
        </div>
        <Text as="p" className="!m-0">
          Manage your lists, add, edit, and delete tasks from your lists.
        </Text>
        <div>
          <ListModal
            id={currentList.id}
            open={isListModalOpen}
            onClose={() => setIsListModalOpen(false)}
          />
          <CreateListDialog
            trigger={
              <Button className="flex gap-1">
                <ListPlus className="w-5" />
                Create List
              </Button>
            }
          />
          <EditListNameDialog
            open={isOpen}
            listId={currentList.id}
            currentTitle={currentList.title}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[900px]">
        {data?.getListsByUser.length === 0 && (
          <div className="m-auto">No Lists yet!</div>
        )}
        {data?.getListsByUser.map((list) => (
          <ContextMenu key={list.id}>
            <ContextMenuTrigger>
              <ListCard
                id={list.id}
                title={list.title}
                onClick={() => {
                  setCurrentList({ id: list.id, title: list.title });
                  setIsListModalOpen(true);
                }}
              />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                className="flex gap-2"
                onClick={() => {
                  setCurrentList({ id: list.id, title: list.title });
                  setIsOpen(true);
                }}
              >
                <Pencil className="w-4" />
                Edit Name
              </ContextMenuItem>
              <ContextMenuItem
                className="text-red-500 flex gap-2"
                onClick={() =>
                  deleteList({
                    optimisticResponse: { deleteList: list.id },
                    variables: { id: list.id },
                  })
                }
              >
                <Trash2 className="w-4" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  );
};

export default Manage;
