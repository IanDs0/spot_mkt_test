'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen relative 
      ${theme === 'dark' ? 'bg-sidebar-dark' : 'bg-sidebar'}`}
    >
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300
          ${isSidebarOpen ? 'left-64' : 'left-0'}
          ${theme === 'dark' 
            ? 'bg-white text-gray-800 hover:bg-gray-100' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
          } p-2 rounded-r-lg shadow-md z-10`}
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className={`flex-1 overflow-auto
        ${theme === 'dark' ? 'bg-background-dark' : 'bg-background'}`}
      >
        <main className="p-8">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
