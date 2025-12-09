import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  BookOpen,
  GraduationCap,
  MessageCircle,
  Bell,
  Calendar,
  Bot,
  Files,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'planos', label: 'Planos de Aula', icon: BookOpen },
  { id: 'notas', label: 'Notas & Pauta', icon: GraduationCap },
  { id: 'chat', label: 'Mensagens', icon: MessageCircle, badge: 3 },
  { id: 'notificacoes', label: 'Notificações', icon: Bell, badge: 5 },
  { id: 'atividades', label: 'Atividades', icon: Calendar },
  { id: 'assistante', label: 'Assistente IA', icon: Bot },
  { id: 'recursos', label: 'Recursos', icon: Files },
  { id: 'perfil', label: 'Perfil', icon: User },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={cn(
      "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-sm font-bold text-gray-900">Portal do Educador</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 bg-transparent"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className={cn("p-2", collapsed && "px-1")}>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-center mb-1 h-10 bg-white text-blue-700 border border-gray-300 hover:text-blue-700",
                collapsed && "px-2",
                activeTab === item.id && "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => {
                onTabChange(item.id)
                navigate("/"+ item.id)
              }}
            >
              <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 pl-1 text-xs rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}