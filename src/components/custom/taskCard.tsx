import React from "react";
import { Checkbox, Skeleton } from "..";
import { motion } from "framer-motion";

export interface TaskCardProps {
  id: string;
  name: string;
  onClick?: () => void;
}

// eslint-disable-next-line
const TaskCardComponent = React.forwardRef<HTMLDivElement, TaskCardProps>(
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

export const MotionTaskCard = motion(TaskCardComponent);

export const TaskCard = TaskCardComponent as React.ForwardRefExoticComponent<
  TaskCardProps & React.RefAttributes<HTMLDivElement>
> & {
  Skeleton: React.FC;
};

// eslint-disable-next-line
TaskCard.Skeleton = () => <Skeleton className="w-full px-6 py-4 min-h-16" />;
