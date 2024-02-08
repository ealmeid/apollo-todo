import { Text, Progress } from "../..";

interface ListCardProps {
  key: string;
  id: string;
  title: string;
}

export const ListCard: React.FC<ListCardProps> = ({ key, id, title }) => {
  return (
    <div
      className="cursor-pointer bg-slate-100 flex items-center gap-4 w-full px-6 py-4 border-slate-200 border rounded-lg min-h-16 hover:shadow-lg transition duration-200 "
      key={key}
    >
      <div className="flex items-start gap-4 w-full">
        <div className="min-w-8 rounded-md bg-white border-slate-400 border w-8 h-8 flex items-center justify-center">
          {title.substring(0, 1).toUpperCase()}
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <Text as="p" className="!m-0 font-semibold">
            {title}
          </Text>
          <Text as="muted" className="truncate mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Progress value={50} className="h-2 border" bgColor="bg-green-800" />
        </div>
      </div>
    </div>
  );
};
