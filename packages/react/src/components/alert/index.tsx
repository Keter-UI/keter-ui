import React from 'react';
import { cn } from '@keter-ui/core';

const variantStyles = {
  default: {
    wrap:  'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60',
    icon:  'text-zinc-500 dark:text-zinc-400',
    title: 'text-zinc-900 dark:text-zinc-50',
    body:  'text-zinc-600 dark:text-zinc-400',
  },
  info: {
    wrap:  'border-blue-200 bg-blue-50 dark:border-blue-900/60 dark:bg-blue-950/30',
    icon:  'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100',
    body:  'text-blue-700 dark:text-blue-300',
  },
  success: {
    wrap:  'border-green-200 bg-green-50 dark:border-green-900/60 dark:bg-green-950/30',
    icon:  'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-100',
    body:  'text-green-700 dark:text-green-300',
  },
  warning: {
    wrap:  'border-yellow-200 bg-yellow-50 dark:border-yellow-900/60 dark:bg-yellow-950/30',
    icon:  'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-100',
    body:  'text-yellow-700 dark:text-yellow-300',
  },
  danger: {
    wrap:  'border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/30',
    icon:  'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-100',
    body:  'text-red-700 dark:text-red-300',
  },
} as const;

function DefaultIcon() {
  return <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={8} cy={8} r={7} /><path d="M8 5v3M8 11h.01" /></svg>;
}
function InfoIcon() {
  return <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={8} cy={8} r={7} /><path d="M8 7v5M8 5h.01" /></svg>;
}
function SuccessIcon() {
  return <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={8} cy={8} r={7} /><path d="M5 8l2 2 4-4" /></svg>;
}
function WarningIcon() {
  return <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 2L1.5 13h13L8 2z" /><path d="M8 6v3M8 11h.01" /></svg>;
}
function DangerIcon() {
  return <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={8} cy={8} r={7} /><path d="M10 6L6 10M6 6l4 4" /></svg>;
}

const icons = {
  default: DefaultIcon,
  info:    InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger:  DangerIcon,
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantStyles;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const Alert = ({ className, variant = 'default', title, icon, onClose, children, ...props }: AlertProps) => {
  const styles = variantStyles[variant];
  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn('relative w-full rounded-lg border p-4', styles.wrap, className)}
      {...props}
    >
      <div className="flex gap-3">
        <span className={cn('mt-0.5 shrink-0', styles.icon)}>
          {icon ?? <Icon />}
        </span>
        <div className="flex-1 min-w-0 pe-6">
          {title && (
            <h5 className={cn('mb-1 text-sm font-semibold leading-none', styles.title)}>
              {title}
            </h5>
          )}
          <div className={cn('text-sm leading-relaxed', styles.body)}>
            {children}
          </div>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute end-3 top-3 rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>
      )}
    </div>
  );
};
