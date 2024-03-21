import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui";

export const emojiOptions = [
  "👍",
  "👎",
  "👌",
  "🔥",
  "💯",
  "💥",
  "👻",
  "🫠",
  "😎",
];

interface EmojiDrawerProps {
  currentEmoji: string;
  onSelect: (emoji: string, close: () => void) => void;
}

export const EmojiDrawer: React.FC<EmojiDrawerProps> = ({
  currentEmoji,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen}>
      <DrawerTrigger onClick={() => setIsOpen(true)}>
        <div className="text-4xl hover:bg-gray-300 p-1 px-2 rounded-md cursor-pointer absolute bottom-2 translate-y-2 translate-x-4">
          {currentEmoji}
        </div>
      </DrawerTrigger>
      <DrawerContent
        className="flex items-center my-8"
        onBlur={() => setIsOpen(false)}
      >
        <DrawerHeader className="mb-4">
          <DrawerTitle>Select an emoji to represent your list</DrawerTitle>
        </DrawerHeader>
        <div className="grid grid-cols-6 gap-4">
          {emojiOptions.map((emoji) => (
            <div
              key={emoji}
              onClick={() => {
                onSelect(emoji, () => setIsOpen(false));
              }}
              className="cursor-pointer text-3xl hover:bg-gray-300 p-2 rounded-md"
            >
              {emoji}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
