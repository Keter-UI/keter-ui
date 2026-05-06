'use client';

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@keter-ui/core';
import type { Side } from '@keter-ui/core';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: Side;
  delayMs?: number;
  disabled?: boolean;
  className?: string;
}

export const Tooltip = ({ content, children, side = 'top', delayMs = 300, disabled, className }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLElement>(null);

  if (disabled) return children;

  const positionTooltip = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const { scrollX, scrollY } = window;
    const gap = 8;

    let x = 0;
    let y = 0;

    switch (side) {
      case 'top':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.top + scrollY - gap;
        break;
      case 'bottom':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.bottom + scrollY + gap;
        break;
      case 'left':
        x = rect.left + scrollX - gap;
        y = rect.top + scrollY + rect.height / 2;
        break;
      case 'right':
        x = rect.right + scrollX + gap;
        y = rect.top + scrollY + rect.height / 2;
        break;
    }

    setCoords({ x, y });
  };

  const show = () => {
    positionTooltip();
    timerRef.current = setTimeout(() => setVisible(true), delayMs);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const transformOriginMap: Record<Side, string> = {
    top:    'bottom center',
    bottom: 'top center',
    left:   'center right',
    right:  'center left',
  };

  const translateMap: Record<Side, string> = {
    top:    '-translate-x-1/2 -translate-y-full',
    bottom: '-translate-x-1/2',
    left:   '-translate-x-full -translate-y-1/2',
    right:  '-translate-y-1/2',
  };

  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (children.props as any).onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (children.props as any).onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (children.props as any).onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (children.props as any).onBlur?.(e);
    },
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <>
      {trigger}
      {visible && typeof document !== 'undefined' && createPortal(
        <div
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-[999] w-max max-w-xs rounded-md',
            'bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-50 shadow-md',
            'dark:bg-zinc-50 dark:text-zinc-900',
            'animate-in fade-in-0 zoom-in-95 duration-100',
            translateMap[side],
            className
          )}
          style={{ 
            left: coords.x, 
            top: coords.y, 
            transformOrigin: transformOriginMap[side] 
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
};
