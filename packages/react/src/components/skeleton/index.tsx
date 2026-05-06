import React from 'react';
import { cn } from '@keter-ui/core';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text';
  lines?: number;
}

export const Skeleton = ({ className, variant = 'default', lines, ...props }: SkeletonProps) => {
  if (lines && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 h-4',
              i === lines - 1 && 'w-3/4',
              className
            )}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-200 dark:bg-zinc-800',
        variant === 'circular' ? 'rounded-full' : variant === 'text' ? 'rounded h-4' : 'rounded-md',
        className
      )}
      {...props}
    />
  );
};
