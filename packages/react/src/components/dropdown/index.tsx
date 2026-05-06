'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { cn } from '@keter-ui/core';
import type { Align, Side } from '@keter-ui/core';

interface DropdownCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<DropdownCtx>({ open: false, setOpen: () => {} });

export interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export const Dropdown = ({ children, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return (
    <Ctx.Provider value={{ open, setOpen }}>
      <div ref={ref} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </Ctx.Provider>
  );
};

export interface DropdownTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { open, setOpen } = useContext(Ctx);
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
      (children.props as any).onClick?.(e);
    },
    'aria-expanded': open,
    'aria-haspopup': 'menu',
  } as React.HTMLAttributes<HTMLElement>);
};

const sideAlignMap: Record<Side, Record<Align, string>> = {
  bottom: {
    start:  'top-full mt-1 start-0',
    center: 'top-full mt-1 left-1/2 -translate-x-1/2',
    end:    'top-full mt-1 end-0',
  },
  top: {
    start:  'bottom-full mb-1 start-0',
    center: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
    end:    'bottom-full mb-1 end-0',
  },
  left: {
    start:  'end-full me-1 top-0',
    center: 'end-full me-1 top-1/2 -translate-y-1/2',
    end:    'end-full me-1 bottom-0',
  },
  right: {
    start:  'start-full ms-1 top-0',
    center: 'start-full ms-1 top-1/2 -translate-y-1/2',
    end:    'start-full ms-1 bottom-0',
  },
};

export interface DropdownContentProps {
  children: React.ReactNode;
  side?: Side;
  align?: Align;
  className?: string;
  minWidth?: string | number;
}

export const DropdownContent = ({ children, side = 'bottom', align = 'start', className, minWidth = '12rem' }: DropdownContentProps) => {
  const { open } = useContext(Ctx);
  if (!open) return null;

  return (
    <div
      role="menu"
      className={cn(
        'absolute z-50 min-w-[12rem] overflow-hidden rounded-xl',
        'border border-zinc-200 bg-white py-1 shadow-lg',
        'dark:border-zinc-800 dark:bg-zinc-950',
        'animate-in fade-in-0 zoom-in-95 duration-100',
        sideAlignMap[side]?.[align],
        className
      )}
      style={{ minWidth }}
    >
      {children}
    </div>
  );
};

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  destructive?: boolean;
  shortcut?: string;
}

export const DropdownItem = ({ children, leftIcon, rightIcon, destructive, shortcut, className, onClick, ...props }: DropdownItemProps) => {
  const { setOpen } = useContext(Ctx);

  return (
    <button
      role="menuitem"
      type="button"
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors',
        'focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800',
        destructive
          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30'
          : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {leftIcon && <span className="shrink-0 opacity-60">{leftIcon}</span>}
      <span className="flex-1 text-start">{children}</span>
      {shortcut && <span className="ms-auto text-xs tracking-widest opacity-40">{shortcut}</span>}
      {rightIcon && <span className="shrink-0 opacity-60">{rightIcon}</span>}
    </button>
  );
};

export const DropdownSeparator = ({ className }: { className?: string }) => (
  <div className={cn('my-1 h-px bg-zinc-100 dark:bg-zinc-800', className)} role="separator" />
);

export const DropdownLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('px-3 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider', className)}>
    {children}
  </div>
);
