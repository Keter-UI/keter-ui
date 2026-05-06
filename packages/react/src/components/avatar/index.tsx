import React, { useState } from 'react';
import { cn } from '@keter-ui/core';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

const sizeMap = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const statusMap = {
  online:  'bg-green-500',
  offline: 'bg-zinc-400',
  busy:    'bg-red-500',
  away:    'bg-yellow-500',
};

const statusSizeMap = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

export const Avatar = ({ src, alt, fallback, size = 'md', shape = 'circle', status, className }: AvatarProps) => {
  const [error, setError] = useState(false);
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl';

  return (
    <span className={cn('relative inline-flex shrink-0', sizeMap[size], className)}>
      <span
        className={cn(
          'flex h-full w-full items-center justify-center overflow-hidden',
          shapeClass,
          !src || error
            ? 'bg-zinc-200 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 uppercase'
            : ''
        )}
      >
        {src && !error ? (
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span>{fallback?.slice(0, 2) ?? '?'}</span>
        )}
      </span>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 end-0 block rounded-full ring-2 ring-white dark:ring-zinc-950',
            statusMap[status],
            statusSizeMap[size]
          )}
          aria-label={status}
        />
      )}
    </span>
  );
};

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

export const AvatarGroup = ({ avatars, max = 5, size = 'md', className }: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const rest = avatars.length - max;

  const sizeClass = sizeMap[size];

  return (
    <div className={cn('flex -space-x-2 rtl:space-x-reverse', className)}>
      {visible.map((a, i) => (
        <Avatar
          key={i}
          {...a}
          size={size}
          className={cn('ring-2 ring-white dark:ring-zinc-950', a.className)}
        />
      ))}
      {rest > 0 && (
        <span
          className={cn(
            'flex items-center justify-center rounded-full',
            'bg-zinc-200 dark:bg-zinc-800',
            'font-semibold text-zinc-600 dark:text-zinc-300',
            'ring-2 ring-white dark:ring-zinc-950',
            sizeClass
          )}
        >
          +{rest}
        </span>
      )}
    </div>
  );
};
