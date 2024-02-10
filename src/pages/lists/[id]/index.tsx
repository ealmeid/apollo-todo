import { Checkbox, Separator, Text } from "@/components";
import {
  useGetListByIdWithTasksQuery,
  useEditTaskMutation,
} from "@/graphql/types/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export const List: React.FC<any> = ({}) => {
  const router = useRouter();
  const [editTask] = useEditTaskMutation();

  const { id } = router.query;

  if (!id) {
    <Loader2 className="animate-spin w-4 h-4" />;
  }

  const { data, loading, error } = useGetListByIdWithTasksQuery({
    variables: {
      id: id as string,
    },
  });

  return (
    <div className="mt-24">
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {data && !error && (
        <div className="w-full max-w-[500px] m-auto flex flex-col gap-6">
          <Text as="h1">{data?.getListById?.title}</Text>
          <Text as="muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            aliquid incidunt natus sint nemo error quasi consequuntur, explicabo
            neque aperiam eveniet placeat aliquam, non ducimus praesentium id
            assumenda tempora optio.
          </Text>
          <Separator className="my-2" />
          <Text as="h4">Tasks</Text>
          {data?.getListById?.tasks.length === 0 && (
            <Text as="muted">No tasks found</Text>
          )}
          {data?.getListById?.tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center rounded-md bg-slate-100 px-4 p-2 gap-4 max-w-[50%] border"
            >
              <Checkbox
                className="w-5 h-5"
                checked={task.isCompleted}
                onClick={(e) => {
                  editTask({
                    variables: {
                      input: {
                        id: task.id,
                        isCompleted: !task.isCompleted,
                      },
                    },
                  });
                }}
              />
              <div>{task.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
