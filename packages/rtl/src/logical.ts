import type { Direction } from '@keter-ui/core';

/**
 * Map physical properties to CSS logical properties.
 * Use these instead of left/right to get RTL for free.
 */

export function marginInlineStart(value: string): React.CSSProperties {
  return { marginInlineStart: value };
}

export function marginInlineEnd(value: string): React.CSSProperties {
  return { marginInlineEnd: value };
}

export function paddingInlineStart(value: string): React.CSSProperties {
  return { paddingInlineStart: value };
}

export function paddingInlineEnd(value: string): React.CSSProperties {
  return { paddingInlineEnd: value };
}

export function insetInlineStart(value: string): React.CSSProperties {
  return { insetInlineStart: value };
}

export function insetInlineEnd(value: string): React.CSSProperties {
  return { insetInlineEnd: value };
}

/** Flip a value based on direction (e.g. for translateX) */
export function flipForRTL(value: number, dir: Direction): number {
  return dir === 'rtl' ? -value : value;
}

/** Return 'start' or 'end' for flex/grid alignment based on direction */
export function startOf(dir: Direction): 'flex-start' | 'flex-end' {
  return dir === 'rtl' ? 'flex-end' : 'flex-start';
}

export function endOf(dir: Direction): 'flex-start' | 'flex-end' {
  return dir === 'rtl' ? 'flex-start' : 'flex-end';
}

/** Tailwind RTL class helper — prefixes classes with rtl: or ltr: */
export function rtl(rtlClass: string, ltrClass: string, dir: Direction): string {
  return dir === 'rtl' ? rtlClass : ltrClass;
}

// Needed for CSSProperties type
import type React from 'react';
