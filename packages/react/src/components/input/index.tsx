import React from 'react';
import { cn } from '@keter-ui/core';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, leftElement, rightElement, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
            {props.required && <span className="ms-1 text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-zinc-400">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm',
              'transition-all placeholder:text-zinc-400',
              'focus-visible:outline-none focus-visible:ring-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500',
              error
                ? 'border-red-400 focus-visible:ring-red-400 dark:border-red-800'
                : 'border-zinc-200 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:focus-visible:ring-zinc-50',
              leftElement && 'ps-9',
              rightElement && 'pe-9',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-zinc-400">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} role="alert" className="flex items-center gap-1 text-xs font-medium text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-zinc-500 dark:text-zinc-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
