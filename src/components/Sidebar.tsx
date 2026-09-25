import React from 'react';
import { LayoutDashboard, FileText, Users, BarChart3, ExternalLink } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Ordens de Serviço', icon: FileText },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'analytics', label: 'Métricas e Relatórios', icon: BarChart3 },
    { id: 'portal', label: 'Portal do Cliente', icon: ExternalLink },
  ];

  return (
    <aside className="sidebar no-print">
      <div className="sidebar__brand">
        <FileText size={24} color="#d97706" />
        <span>OpsVantage</span>
      </div>
      <nav className="sidebar__nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar__item ${currentTab === item.id ? 'sidebar__item--active' : ''}`}
              onClick={() => setCurrentTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
