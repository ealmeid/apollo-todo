import React from "react";
import { Checkbox, Skeleton } from "../..";
import { motion } from "framer-motion";
import { useEditTaskMutation } from "@/graphql/types/client";

export interface TaskCardProps {
  id: string;
  name: string;
  isCompleted: boolean;
  onClick?: () => void;
}

// eslint-disable-next-line
const TaskCardComponent = React.forwardRef<HTMLDivElement, TaskCardProps>(
  ({ id, name, isCompleted, onClick, ...props }, ref) => {
    const [editTask] = useEditTaskMutation();

    return (
      <div
        onClick={onClick}
        ref={ref}
        key={id}
        className="cursor-pointer bg-slate-100 flex items-center gap-4 w-full px-6 py-4 border-slate-200 border rounded-md min-h-16 hover:bg-slate-50"
      >
        <Checkbox
          className="w-6 h-6"
          checked={isCompleted}
          onClick={(e) => {
            e.stopPropagation();
            editTask({
              variables: {
                input: {
                  id,
                  isCompleted: !isCompleted,
                },
              },
            });
          }}
        />
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
