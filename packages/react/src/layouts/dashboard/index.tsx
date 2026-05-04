import React from 'react';
import { cn } from '@keter-ui/core';

export const Sidebar: React.FC<{ collapsed?: boolean; children: React.ReactNode }> = ({ collapsed, children }) => (
  <aside className={cn(
    'flex flex-col border-e border-secondary-100 bg-white transition-all duration-300 h-screen sticky top-0',
    collapsed ? 'w-20' : 'w-64'
  )}>
    {children}
  </aside>
);

export const Topbar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <header className="h-16 border-b border-secondary-100 bg-white flex items-center px-6 sticky top-0 z-10">
    {children}
  </header>
);

export const DashboardLayout: React.FC<{
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}> = ({ sidebar, topbar, children }) => (
  <div className="flex min-h-screen bg-secondary-50/50">
    {sidebar}
    <div className="flex flex-col flex-1 min-w-0">
      {topbar}
      <main className="p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  </div>
);
