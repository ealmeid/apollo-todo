import { Button } from "@/components";
import { ArrowDown, Loader2 } from "lucide-react";
import { useState } from "react";

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<any>;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (isLoadingMore) {
    return <Loader2 className="animate-spin" size={32} color="currentColor" />;
  }
  return (
    <Button
      variant="outline"
      className="flex gap-2"
      onClick={() => {
        setIsLoadingMore(true);
        onLoadMore().finally(() => {
          setIsLoadingMore(false);
        });
      }}
    >
      <ArrowDown className="w-5" />
      Load More
    </Button>
  );
};
