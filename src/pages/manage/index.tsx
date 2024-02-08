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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Manage = () => {
  const { data } = useGetListsByUserQuery();
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

  return (
    <div className="items-center flex flex-col gap-8 m-auto mt-24 max-w-[900px] pb-12">
      <div className="flex flex-col gap-6 mr-auto">
        <Text as="h1" className="!text-4xl">
          Your Lists
        </Text>
        <Text as="p" className="!m-0">
          Manage your lists, add, edit, and delete tasks from your lists.
        </Text>
        <div>
          <CreateListDialog trigger={<Button>Create List</Button>} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[900px]">
        {data?.getListsByUser.length === 0 && (
          <div className="m-auto">No Lists yet!</div>
        )}
        {data?.getListsByUser.map((list) => (
          <ContextMenu key={list.id}>
            <ContextMenuTrigger>
              <ListCard key={list.id} id={list.id} title={list.title} />
            </ContextMenuTrigger>
            <ContextMenuContent>
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
