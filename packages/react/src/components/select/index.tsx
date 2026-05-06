'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@keter-ui/core';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: SelectOption[];
  groups?: SelectGroup[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Select = ({
  value,
  defaultValue,
  onValueChange,
  options = [],
  groups = [],
  placeholder = 'Select…',
  label,
  helperText,
  error,
  disabled,
  className,
  id,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const allOptions = [
    ...options,
    ...groups.flatMap((g) => g.options),
  ];
  const selected = allOptions.find((o) => o.value === currentValue);
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onValueChange?.(opt.value);
    setOpen(false);
  };

  const renderOption = (opt: SelectOption) => (
    <li
      key={opt.value}
      role="option"
      aria-selected={opt.value === currentValue}
      aria-disabled={opt.disabled}
      onClick={() => handleSelect(opt)}
      className={cn(
        'flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors',
        opt.disabled
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
        opt.value === currentValue && 'font-semibold text-zinc-900 dark:text-zinc-50'
      )}
    >
      <div>
        <span>{opt.label}</span>
        {opt.description && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">{opt.description}</p>
        )}
      </div>
      {opt.value === currentValue && (
        <svg viewBox="0 0 14 11" className="h-3 w-3 text-zinc-900 dark:text-zinc-50 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 5.5l4 4L13 1" />
        </svg>
      )}
    </li>
  );

  return (
    <div className={cn('w-full space-y-1.5', className)} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm',
            'transition-all focus-visible:outline-none focus-visible:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-zinc-950 dark:text-zinc-50',
            error
              ? 'border-red-400 focus-visible:ring-red-400 dark:border-red-800'
              : 'border-zinc-200 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:focus-visible:ring-zinc-50',
            open && (error ? 'ring-2 ring-red-400' : 'ring-2 ring-zinc-900 dark:ring-zinc-50')
          )}
        >
          <span className={selected ? '' : 'text-zinc-400 dark:text-zinc-500'}>
            {selected?.label ?? placeholder}
          </span>
          <svg
            viewBox="0 0 16 16"
            className={cn('h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0', open && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute z-50 mt-1 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 max-h-60"
          >
            {groups.length > 0
              ? groups.map((group) => (
                  <React.Fragment key={group.label}>
                    <li className="px-3 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      {group.label}
                    </li>
                    {group.options.map(renderOption)}
                  </React.Fragment>
                ))
              : options.map(renderOption)}
          </ul>
        )}
      </div>
      {error && <p role="alert" className="text-xs font-medium text-red-500">{error}</p>}
      {helperText && !error && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>}
    </div>
  );
};
