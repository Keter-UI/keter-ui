'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Direction } from '@keter-ui/core';
import { isRTLLocale, applyDocumentDirection } from './direction.js';

/** Read current document direction */
export function useDirection(): Direction {
  const [dir, setDir] = useState<Direction>(() => {
    if (typeof document === 'undefined') return 'ltr';
    return (document.documentElement.dir as Direction) || 'ltr';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDir((document.documentElement.dir as Direction) || 'ltr');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });
    return () => observer.disconnect();
  }, []);

  return dir;
}

/** Manage direction from a locale string */
export function useLocaleDirection(locale: string) {
  const dir: Direction = isRTLLocale(locale) ? 'rtl' : 'ltr';
  const isRTL = dir === 'rtl';

  const apply = useCallback(() => {
    applyDocumentDirection(dir, locale);
  }, [dir, locale]);

  useEffect(() => {
    apply();
  }, [apply]);

  return { dir, isRTL, apply };
}

/** Returns whether current document direction is RTL */
export function useIsRTL(): boolean {
  return useDirection() === 'rtl';
}
