import { useEffect, useState } from "react";
import { Dialog, DialogContent, Text, Checkbox, SelectOptions } from "../../..";
import { LoadMoreButton } from "../../LoadMoreButton";

interface SelectModalProps<T> {
  options: T[];
  onLoadMore?: () => any;
  open: boolean;
  onClose: () => any;
}

export const SelectModal = <T,>({
  options = [],
  onLoadMore,
  open = false,
  onClose = () => {},
}: SelectModalProps<T>) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Dialog open={isOpen} modal>
      <DialogContent
        className="p-8 rounded-md"
        onEscapeKeyDown={onClose}
        onInteractOutside={onClose}
      >
        <Text as="h3">Select</Text>
        <SelectOptions
          options={options}
          renderOption={(option, isSelected, onSelect) => (
            <div
              className="shadow-md p-4 flex items-center gap-6 rounded-md"
              onClick={onSelect as any}
            >
              {/* TODO: fix this type later */}
              {(option as any).title}
              <Checkbox checked={isSelected} />
            </div>
          )}
        />
        {onLoadMore && <LoadMoreButton onLoadMore={onLoadMore} />}
      </DialogContent>
    </Dialog>
  );
};
