'use client';

import React, { useState } from 'react';
import { cn } from '@keter-ui/core';

export interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

export const Accordion = ({ items, type = 'single', defaultValue, value, onValueChange, className }: AccordionProps) => {
  const normalize = (v?: string | string[]): string[] => {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  };

  const [internal, setInternal] = useState<string[]>(normalize(defaultValue));
  const isControlled = value !== undefined;
  const open = isControlled ? normalize(value) : internal;

  const toggle = (itemValue: string) => {
    let next: string[];
    if (type === 'single') {
      next = open.includes(itemValue) ? [] : [itemValue];
    } else {
      next = open.includes(itemValue)
        ? open.filter((v) => v !== itemValue)
        : [...open, itemValue];
    }
    if (!isControlled) setInternal(next);
    onValueChange?.(type === 'single' ? (next[0] ?? '') : next);
  };

  return (
    <div
      className={cn(
        'divide-y divide-zinc-200 dark:divide-zinc-800',
        'rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden',
        className
      )}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div key={item.value}>
            <button
              type="button"
              disabled={item.disabled}
              aria-expanded={isOpen}
              onClick={() => toggle(item.value)}
              className={cn(
                'flex w-full items-center justify-between px-4 py-4 text-sm font-medium',
                'transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-400',
                'text-start',
                item.disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent'
              )}
            >
              {item.trigger}
              <svg
                viewBox="0 0 16 16"
                className={cn('ms-3 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200', isOpen && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-4 pb-4 text-sm text-zinc-600 dark:text-zinc-400">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
