import React from "react";
import { Checkbox, Skeleton } from "..";
import { motion } from "framer-motion";

export interface TodoCardProps {
  id: string;
  name: string;
  onClick?: () => void;
}

// eslint-disable-next-line
const TodoCardComponent = React.forwardRef<HTMLDivElement, TodoCardProps>(
  ({ id, name, onClick, ...props }, ref) => {
    return (
      <div
        onClick={onClick}
        ref={ref}
        key={id}
        className="bg-slate-100 flex items-center gap-4 w-full px-6 py-4 border-slate-200 border rounded-md min-h-16 hover:bg-slate-50"
      >
        <Checkbox className="w-6 h-6" onClick={(e) => e.stopPropagation()} />
        <div>{name}</div>
      </div>
    );
  }
);

export const MotionTodoCard = motion(TodoCardComponent);

export const TodoCard = TodoCardComponent as React.ForwardRefExoticComponent<
  TodoCardProps & React.RefAttributes<HTMLDivElement>
> & {
  Skeleton: React.FC;
};

// eslint-disable-next-line
TodoCard.Skeleton = () => <Skeleton className="w-full px-6 py-4 min-h-16" />;
