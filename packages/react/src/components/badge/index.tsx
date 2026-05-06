import React from 'react';
import { cn, variants } from '@keter-ui/core';

const badgeVariants = variants({
  base: 'inline-flex items-center rounded-full font-semibold transition-colors',
  variants: {
    variant: {
      default:     'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900',
      secondary:   'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200',
      outline:     'border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300',
      success:     'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
      warning:     'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
      danger:      'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
      brand:       'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
    dot: {
      true: 'gap-1.5',
      false: '',
    },
  },
  defaultVariants: { variant: 'default', size: 'md', dot: 'false' },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = ({ className, variant, size, dot, children, ...props }: BadgeProps) => (
  <span
    className={cn(badgeVariants({ variant, size, dot: dot ? 'true' : 'false' }), className)}
    {...props}
  >
    {dot && (
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
    )}
    {children}
  </span>
);
