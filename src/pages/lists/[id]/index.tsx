import { useCallback, useEffect, useState } from "react";
import {
  Checkbox,
  LoadMoreButton,
  SelectModal,
  Separator,
  Text,
  EmojiDrawer,
} from "@/components";
import {
  useGetListByIdWithTasksQuery,
  useEditListMutation,
} from "@/graphql/types/client";
import { Calendar, Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import dayjs from "dayjs";
import { toast } from "sonner";

export const List: React.FC<any> = () => {
  const router = useRouter();
  const { isLoaded } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [editList] = useEditListMutation();

  const { id } = router.query;

  if (!id) {
    <Loader2 className="animate-spin w-4 h-4" />;
  }

  const {
    data: listData,
    loading,
    refetch,
    error,
    fetchMore,
  } = useGetListByIdWithTasksQuery({
    variables: {
      id: id as string,
      first: 1,
    },
  });

  useEffect(() => {
    if (!listData) {
      refetch();
    }
  }, [listData, isLoaded, refetch]);

  const onFetchMore = useCallback(
    () =>
      fetchMore({
        variables: {
          id,
          first: 1,
          after: listData?.getListById?.tasks?.pageInfo?.endCursor,
        },
      }),
    [id, listData, fetchMore]
  );

  const list = listData?.getListById;

  return (
    <div className="mt-24">
      <SelectModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        options={list?.tasks?.edges.map(({ node }) => node) ?? []}
        onLoadMore={onFetchMore}
      />
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {list && !error && !loading && (
        <div className="w-full max-w-[500px] m-auto flex flex-col gap-6">
          <div className="relative">
            <div className="w-full rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-500 h-[100px]"></div>
            <EmojiDrawer
              currentEmoji={list?.emoji}
              onSelect={(emoji, close) => {
                editList({
                  variables: {
                    input: {
                      id: list?.id,
                      emoji,
                    },
                  },
                  onCompleted: () => {
                    close();
                    toast.success(`Emoji updated to ${emoji}!`);
                  },
                  optimisticResponse: {
                    editList: {
                      ...list,
                      emoji,
                    },
                  },
                });
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Text as="h1" className="!text-4xl">
              {list?.title}
            </Text>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-500" />
            <Text as="muted" className="!m-0">
              {dayjs(list?.createdAt ?? "").format("MMMM D, YYYY")}
            </Text>
          </div>
          <Text as="muted">{list?.description}</Text>
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

          {list?.tasks?.edges.length === 0 && (
            <Text as="muted">No tasks found</Text>
          )}

          {list?.tasks?.edges.map(({ node: task }) => (
            <div
              key={task.id}
              className="flex items-center rounded-md bg-slate-100 px-4 p-2 gap-4 max-w-[50%] border"
            >
              <Checkbox className="w-5 h-5" checked={task.isCompleted} />
              <div>{task.title}</div>
            </div>
          ))}
          {list?.tasks?.pageInfo?.hasNextPage && (
            <LoadMoreButton
              className="m-auto"
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    id,
                    first: 1,
                    after: list?.tasks?.pageInfo?.endCursor,
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
