import React from 'react';
import { cn } from '@keter-ui/core';

export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, defaultChecked, onCheckedChange, label, description, indeterminate, disabled, className, id, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    const handleClick = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <div className={cn('flex items-start gap-2', className)}>
        <button
          ref={ref}
          id={inputId}
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            'relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded',
            'border-2 transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isChecked || indeterminate
              ? 'border-zinc-900 bg-zinc-900 dark:border-zinc-50 dark:bg-zinc-50'
              : 'border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950 hover:border-zinc-500'
          )}
          {...props}
        >
          {indeterminate ? (
            <span className="h-0.5 w-2 rounded-full bg-white dark:bg-zinc-900" />
          ) : isChecked ? (
            <svg
              viewBox="0 0 10 8"
              className="h-2.5 w-2.5 text-white dark:text-zinc-900"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 4l2.5 2.5L9 1" />
            </svg>
          ) : null}
        </button>
        {(label || description) && (
          <div className="min-w-0">
            {label && (
              <label
                htmlFor={inputId}
                className={cn('block text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
