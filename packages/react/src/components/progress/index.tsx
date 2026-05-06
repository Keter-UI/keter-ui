import React from 'react';
import { cn } from '@keter-ui/core';

export interface ProgressProps {
  value?: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger';
  animated?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const variantMap = {
  default: 'bg-zinc-900 dark:bg-zinc-50',
  brand:   'bg-blue-600 dark:bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger:  'bg-red-500',
};

export const Progress = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  animated,
  label,
  showValue,
  className,
}: ProgressProps) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>}
          {showValue && <span className="text-xs text-zinc-500 dark:text-zinc-400">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn('relative w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800', sizeMap[size])}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            variantMap[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
