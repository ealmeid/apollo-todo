import { Text, Button } from "@/components";
import {
  useCreateListMutation,
  useGetListsByUserQuery,
} from "@/graphql/types/client";

export const Manage = () => {
  const [createList] = useCreateListMutation();

  const { data } = useGetListsByUserQuery();

  return (
    <div className="items-center flex flex-col gap-8 m-auto mt-24">
      <Text as="h1">Your Lists</Text>
      <div className="flex flex-col gap-2 max-w-[300px] w-full">
        {data?.getListsByUser.length === 0 && (
          <div className="m-auto">No Lists yet!</div>
        )}
        {data?.getListsByUser.map((list) => (
          <div className="p-4 shadow-md w-full rounded-lg" key={list.id}>
            {list.title}
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          createList({
            variables: {
              title: "test",
            },
          })
        }
      >
        Create List
      </Button>
    </div>
  );
};

export default Manage;
