import React, { useState } from 'react';
import { cn } from '@keter-ui/core';

// ─── Sidebar ────────────────────────────────────────────────────────────────

export interface SidebarProps {
  collapsed?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, children, className }) => (
  <aside
    className={cn(
      'flex flex-col border-e border-secondary-100 bg-white transition-all duration-300 h-screen sticky top-0 shrink-0',
      collapsed ? 'w-[72px]' : 'w-64',
      className
    )}
  >
    {children}
  </aside>
);

// ─── Topbar ──────────────────────────────────────────────────────────────────

export interface TopbarProps {
  children: React.ReactNode;
  className?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ children, className }) => (
  <header
    className={cn(
      'h-16 border-b border-secondary-100 bg-white flex items-center px-6 sticky top-0 z-10 shrink-0',
      className
    )}
  >
    {children}
  </header>
);

// ─── DashboardLayout ─────────────────────────────────────────────────────────

export interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  topbar,
  children,
  className,
}) => (
  <div className={cn('flex min-h-screen bg-secondary-50/50', className)}>
    {sidebar}
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      {topbar}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  </div>
);

// ─── MetricCard ──────────────────────────────────────────────────────────────

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, positive, icon }) => (
  <div className="rounded-xl border border-secondary-100 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-secondary-500">{label}</p>
      {icon && (
        <div className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
          {icon}
        </div>
      )}
    </div>
    <p className="text-2xl font-bold text-secondary-800 tabular-nums">{value}</p>
    {change && (
      <p className={cn('text-xs font-medium mt-1', positive ? 'text-success-600' : 'text-danger-500')}>
        {change} vs last period
      </p>
    )}
  </div>
);

// ─── ActivityFeed ─────────────────────────────────────────────────────────────

export interface ActivityItem {
  user: string;
  action: string;
  time: string;
  avatar?: string;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ items, className }) => (
  <div className={cn('space-y-4', className)}>
    {items.map((item, i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-bold shrink-0">
          {item.avatar ?? item.user[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-secondary-700 leading-snug">
            <span className="font-medium text-secondary-800">{item.user}</span> {item.action}
          </p>
          <p className="text-xs text-secondary-400 mt-0.5">{item.time}</p>
        </div>
      </div>
    ))}
  </div>
);

// ─── NavItem ─────────────────────────────────────────────────────────────────

export interface NavItemProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  badge?: string | number;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  active,
  collapsed,
  onClick,
  badge,
}) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors text-start',
      active
        ? 'bg-primary-50 text-primary-600'
        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-700'
    )}
  >
    {icon && <span className="shrink-0 text-base">{icon}</span>}
    {!collapsed && (
      <>
        <span className="flex-1 truncate">{label}</span>
        {badge !== undefined && (
          <span className="ms-auto text-xs bg-primary-100 text-primary-600 px-1.5 py-0.5 rounded-full font-semibold">
            {badge}
          </span>
        )}
      </>
    )}
  </button>
);
