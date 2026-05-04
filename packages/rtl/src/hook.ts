import { useState, useEffect, useCallback } from 'react';
import { getDirection, setDirection, type Direction } from './rtl';

export function useRTL() {
  const [direction, setDir] = useState<Direction>('ltr');

  useEffect(() => {
    setDir(getDirection());
  }, []);

  const toggleDirection = useCallback(() => {
    const newDir = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDir);
    setDir(newDir);
  }, [direction]);

  return {
    direction,
    isRTL: direction === 'rtl',
    toggleDirection,
    setDirection: (dir: Direction) => {
      setDirection(dir);
      setDir(dir);
    },
  };
}
