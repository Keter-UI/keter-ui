import React from 'react';
import { cn } from '@keter-ui/core';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn('rounded-xl border border-secondary-100 bg-white shadow-sm transition-all hover:shadow-md', className)}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="border-b border-secondary-50 p-4">
    <h4 className="text-lg font-bold text-secondary-700">{title}</h4>
    {subtitle && <p className="text-sm text-secondary-400">{subtitle}</p>}
  </div>
);

export const CardBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-t border-secondary-50 p-4 bg-secondary-50/30">{children}</div>
);
