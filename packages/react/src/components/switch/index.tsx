import React from 'react';
import { cn } from '@keter-ui/core';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled, label, description, size = 'md', className, id }, ref) => {
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

    const trackSizes = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-7 w-14',
    };

    const thumbSizes = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    const thumbTranslates = {
      sm: { off: 'translate-x-0.5', on: 'translate-x-[18px]' },
      md: { off: 'translate-x-1', on: 'translate-x-6' },
      lg: { off: 'translate-x-1', on: 'translate-x-8' },
    };

    const t = thumbTranslates[size];

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <button
          ref={ref}
          id={inputId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            'relative inline-flex shrink-0 items-center rounded-full',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            trackSizes[size],
            isChecked
              ? 'bg-zinc-900 dark:bg-zinc-50'
              : 'bg-zinc-200 dark:bg-zinc-800'
          )}
        >
          <span
            className={cn(
              'inline-block rounded-full bg-white dark:bg-zinc-950 shadow-sm transition-transform duration-200',
              thumbSizes[size],
              isChecked ? t.on : t.off
            )}
          />
        </button>
        {(label || description) && (
          <div>
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
Switch.displayName = 'Switch';
