import React from 'react';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'campaigns', label: 'Campanhas' },
  { id: 'demands', label: 'Demandas' },
  { id: 'calendar', label: 'Calendário' },
  { id: 'settings', label: 'Configurações' }
];

export default function Sidebar({ isOpen }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {menuItems.map(item => (
          <a
            key={item.id}
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
        <ThemeToggle />
      </div>
    </nav>
  );
}
