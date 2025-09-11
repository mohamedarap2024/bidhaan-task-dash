import { 
  Inbox, 
  Calendar, 
  CalendarDays, 
  FolderOpen, 
  Zap,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  Settings
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 3 },
  { id: "today", label: "Today", icon: Calendar },
  { id: "upcoming", label: "Upcoming", icon: CalendarDays },
  { id: "projects", label: "Projects", icon: FolderOpen },
];

const businessItems = [
  { id: "orders", label: "Orders", icon: ShoppingCart, count: 12 },
  { id: "payments", label: "Payments", icon: DollarSign, count: 5 },
  { id: "customers", label: "Customers", icon: Users },
  { id: "inventory", label: "Inventory", icon: Package, count: 8 },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Bidhaan</h1>
            <p className="text-xs text-muted-foreground">Online Electronics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        <div>
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`sidebar-item w-full ${
                      activeSection === item.id ? "active" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-4">
            Business
          </h3>
          <ul className="space-y-1">
            {businessItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`sidebar-item w-full ${
                      activeSection === item.id ? "active" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => onSectionChange("settings")}
          className={`sidebar-item w-full ${
            activeSection === "settings" ? "active" : ""
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};