import { useCallback, useEffect, useState } from "react";
import {
  Checkbox,
  LoadMoreButton,
  SelectModal,
  Separator,
  Text,
} from "@/components";
import {
  useGetListByIdWithTasksQuery,
  useEditTaskMutation,
} from "@/graphql/types/client";
import { Calendar, Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import dayjs from "dayjs";

export const List: React.FC<any> = ({}) => {
  const { isLoaded } = useAuth();
  const router = useRouter();
  const [editTask] = useEditTaskMutation();
  const [isOpen, setIsOpen] = useState(false);

  const { id } = router.query;

  if (!id) {
    <Loader2 className="animate-spin w-4 h-4" />;
  }

  const { data, loading, refetch, error, fetchMore } =
    useGetListByIdWithTasksQuery({
      variables: {
        id: id as string,
        first: 1,
      },
    });

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [data, isLoaded, refetch]);

  const onFetchMore = useCallback(
    () =>
      fetchMore({
        variables: {
          id,
          first: 1,
          after: data?.getListById?.tasks?.pageInfo?.endCursor,
        },
      }),
    [id, data, fetchMore]
  );

  return (
    <div className="mt-24">
      <SelectModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        options={data?.getListById?.tasks?.edges.map(({ node }) => node) ?? []}
        onLoadMore={onFetchMore}
      />
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {data && !error && (
        <div className="w-full max-w-[500px] m-auto flex flex-col gap-6">
          <Text as="h1">{data?.getListById?.title}</Text>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <Text as="p" className="!m-0">
              {dayjs(data?.getListById?.createdAt ?? "").format("MMMM D, YYYY")}
            </Text>
          </div>

          <Text as="muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            aliquid incidunt natus sint nemo error quasi consequuntur, explicabo
            neque aperiam eveniet placeat aliquam, non ducimus praesentium id
            assumenda tempora optio.
          </Text>
          <Separator className="my-2" />
          <div className="flex justify-between items-end gap-8">
            <Text as="h4">Tasks</Text>
            <p
              className="font-medium text-primary underline underline-offset-4 text-sm cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Select
            </p>
          </div>
          {data?.getListById?.tasks?.edges.length === 0 && (
            <Text as="muted">No tasks found</Text>
          )}
          {data?.getListById?.tasks?.edges.map(({ node: task }) => (
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

          {data?.getListById?.tasks?.pageInfo?.hasNextPage && (
            <LoadMoreButton
              className="m-auto"
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    id,
                    first: 1,
                    after: data?.getListById?.tasks?.pageInfo?.endCursor,
                  },
                })
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default List;
