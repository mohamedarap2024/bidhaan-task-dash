import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";
import { TaskItem, Task } from "./TaskItem";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Process Samsung Galaxy orders",
    category: "business",
    completed: true,
    priority: "high",
    dueTime: "14:30"
  },
  {
    id: "2", 
    title: "Call supplier for iPhone inventory",
    category: "work",
    completed: true,
    priority: "medium",
    dueTime: "Yesterday 10:00"
  },
  {
    id: "3",
    title: "Update website product catalog",
    category: "business",
    completed: true,
    priority: "medium",
    dueTime: "Yesterday 14:00"
  },
  {
    id: "4",
    title: "Review customer payment reports",
    category: "business",
    completed: false,
    priority: "high",
    dueTime: "Tomorrow 09:00"
  },
  {
    id: "5",
    title: "Restock laptop accessories",
    category: "business",
    completed: true,
    priority: "low"
  },
];

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("today");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "today": return "Today";
      case "inbox": return "Inbox";
      case "upcoming": return "Upcoming";
      case "projects": return "Projects";
      case "orders": return "Orders Management";
      case "payments": return "Payment Processing";
      case "customers": return "Customer Management";
      case "inventory": return "Inventory Control";
      case "settings": return "Settings";
      default: return "Dashboard";
    }
  };

  const getFilteredTasks = () => {
    if (activeSection === "orders") {
      return tasks.filter(task => task.title.toLowerCase().includes("order") || task.category === "business");
    }
    return tasks;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {getSectionTitle()}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add new task
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {getFilteredTasks().map((task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggleTask} 
                />
              ))}
            </div>

            {getFilteredTasks().length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No tasks yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start organizing your electronics business by adding your first task.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add new task
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};