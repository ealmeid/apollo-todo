import { Text, Button, ListCard, CreateListDialog } from "@/components";
import { useGetListsByUserQuery } from "@/graphql/types/client";

export const Manage = () => {
  const { data } = useGetListsByUserQuery();

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
          <ListCard key={list.id} id={list.id} title={list.title} />
        ))}
      </div>
    </div>
  );
};

export default Manage;
