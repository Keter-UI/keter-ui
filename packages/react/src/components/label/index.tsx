import React from 'react';
import { cn } from '@keter-ui/core';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 text-sm font-medium leading-none',
        'text-zinc-700 dark:text-zinc-300',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 text-xs">*</span>}
      {optional && <span className="text-zinc-400 text-xs font-normal">(optional)</span>}
    </label>
  )
);
Label.displayName = 'Label';
