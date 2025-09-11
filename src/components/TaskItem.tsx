import { Check, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Task {
  id: string;
  title: string;
  category: "work" | "personal" | "business";
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueTime?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const categoryStyles = {
  work: "task-work",
  personal: "task-personal", 
  business: "task-complete"
};

const priorityIcons = {
  low: null,
  medium: Clock,
  high: AlertCircle
};

export const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const PriorityIcon = priorityIcons[task.priority];

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:bg-muted/30 transition-colors group">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center p-0 ${
          task.completed
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground hover:border-primary"
        }`}
      >
        {task.completed && <Check className="w-3 h-3" />}
      </Button>

      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium ${
              task.completed 
                ? "line-through text-muted-foreground" 
                : "text-foreground"
            }`}
          >
            {task.title}
          </span>
          
          <span className={`text-xs px-2 py-1 rounded-full border ${categoryStyles[task.category]}`}>
            {task.category}
          </span>

          {PriorityIcon && (
            <PriorityIcon className={`w-4 h-4 ${
              task.priority === "high" ? "text-red-400" : "text-yellow-400"
            }`} />
          )}
        </div>
      </div>

      {task.dueTime && (
        <span className="text-xs text-muted-foreground">
          {task.dueTime}
        </span>
      )}
    </div>
  );
};