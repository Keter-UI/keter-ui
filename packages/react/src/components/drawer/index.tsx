'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@keter-ui/core';
import type { Side } from '@keter-ui/core';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: Side;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
  showClose?: boolean;
  className?: string;
}

const sideStyles: Record<Side, string> = {
  left:   'inset-y-0 start-0 h-full w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  right:  'inset-y-0 end-0 h-full w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  top:    'inset-x-0 top-0 w-full h-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom: 'inset-x-0 bottom-0 w-full h-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
};

const drawerSizes: Record<'sm' | 'md' | 'lg', Record<Side, string>> = {
  sm: { left: 'max-w-xs', right: 'max-w-xs', top: 'max-h-64', bottom: 'max-h-64' },
  md: { left: 'max-w-sm', right: 'max-w-sm', top: 'max-h-96', bottom: 'max-h-96' },
  lg: { left: 'max-w-md', right: 'max-w-md', top: 'max-h-[60vh]', bottom: 'max-h-[60vh]' },
};

export const Drawer = ({
  isOpen,
  onClose,
  side = 'right',
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showClose = true,
  className,
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        data-state="open"
        className={cn(
          'absolute flex flex-col',
          'border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950',
          side === 'left' || side === 'right'
            ? ['border-e dark:border-e', sideStyles[side], drawerSizes[size][side]].join(' ')
            : ['border-b dark:border-b', sideStyles[side], drawerSizes[size][side]].join(' '),
          className
        )}
      >
        {(title || showClose) && (
          <div className="flex items-start justify-between p-6 pb-4 shrink-0">
            <div className="space-y-1 pe-6">
              {title && <h3 className="text-lg font-semibold leading-none">{title}</h3>}
              {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 transition-colors -me-2 -mt-1 shrink-0"
              >
                <svg viewBox="0 0 12 12" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M1 1l10 10M11 1L1 11" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 pb-4">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-6 py-4 dark:border-zinc-900 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
