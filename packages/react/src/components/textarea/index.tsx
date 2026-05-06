import React from 'react';
import { cn } from '@keter-ui/core';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  autoResize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, autoResize, id, onChange, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      onChange?.(e);
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
            {props.required && <span className="ms-1 text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          onChange={handleChange}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border bg-white px-3 py-2 text-sm',
            'transition-all placeholder:text-zinc-400',
            'focus-visible:outline-none focus-visible:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500',
            autoResize ? 'resize-none overflow-hidden' : 'resize-none',
            error
              ? 'border-red-400 focus-visible:ring-red-400 dark:border-red-800'
              : 'border-zinc-200 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:focus-visible:ring-zinc-50',
            className
          )}
          {...props}
        />
        {error && (
          <p role="alert" className="text-xs font-medium text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
