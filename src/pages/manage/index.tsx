import { Text, Button, Progress } from "@/components";
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
      <div className="flex flex-col gap-4 max-w-[300px] w-full">
        {data?.getListsByUser.length === 0 && (
          <div className="m-auto">No Lists yet!</div>
        )}
        {data?.getListsByUser.map((list) => (
          <div
            className="cursor-pointer bg-slate-100 flex items-center gap-4 w-full px-6 py-4 border-slate-200 border rounded-lg min-h-16 hover:bg-slate-50"
            key={list.id}
          >
            <div className="flex items-start gap-4 w-full">
              <div className="min-w-8 rounded-md bg-white border-slate-400 border w-8 h-8 flex items-center justify-center">
                {list.title.substring(0, 1).toUpperCase()}
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <Text as="p" className="!m-0 font-semibold">
                  {list.title}
                </Text>
                <Text as="muted" className="truncate mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Progress
                  value={50}
                  className="h-2 border"
                  bgColor="bg-green-800"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;
