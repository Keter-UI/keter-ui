'use client';

import React, { createContext, useContext, useId, useState } from 'react';
import { cn } from '@keter-ui/core';

interface TabsContext {
  active: string;
  setActive: (v: string) => void;
  orientation: 'horizontal' | 'vertical';
}

const TabsCtx = createContext<TabsContext>({
  active: '',
  setActive: () => {},
  orientation: 'horizontal',
});

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({ defaultValue = '', value, onValueChange, orientation = 'horizontal', children, className }: TabsProps) => {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const active = isControlled ? value : internal;

  const setActive = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <TabsCtx.Provider value={{ active, setActive, orientation }}>
      <div
        className={cn(orientation === 'vertical' && 'flex gap-4', className)}
        data-orientation={orientation}
      >
        {children}
      </div>
    </TabsCtx.Provider>
  );
};

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList = ({ children, className }: TabsListProps) => {
  const { orientation } = useContext(TabsCtx);
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'flex items-center rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900',
        orientation === 'vertical' ? 'flex-col h-fit' : 'inline-flex h-10',
        className
      )}
    >
      {children}
    </div>
  );
};

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const TabsTrigger = ({ value, children, disabled, className }: TabsTriggerProps) => {
  const { active, setActive } = useContext(TabsCtx);
  const isActive = active === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActive(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium',
        'transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-50'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50',
        className
      )}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent = ({ value, children, className }: TabsContentProps) => {
  const { active } = useContext(TabsCtx);
  if (active !== value) return null;
  return (
    <div role="tabpanel" className={cn('focus-visible:outline-none', className)}>
      {children}
    </div>
  );
};
