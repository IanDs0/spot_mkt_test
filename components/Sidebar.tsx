'use client';

import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './ThemeProvider';

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
  const { theme } = useTheme();
  if (!isOpen) return null;

  return (
    <nav className={`w-64 border-r p-4 h-full flex flex-col transition-colors
      ${theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 text-gray-200' 
        : 'bg-white border-gray-200 text-gray-700'
      }`}
    >
      <div className="flex-1 space-y-4">
        {menuItems.map(item => (
          <a
            key={item.id}
            href="#"
            className={`block px-4 py-2 text-sm rounded-md transition-colors
              ${theme === 'dark'
                ? 'text-gray-200 hover:bg-gray-700'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className={`pt-4 border-t flex justify-center
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <ThemeToggle />
      </div>
    </nav>
  );
}
