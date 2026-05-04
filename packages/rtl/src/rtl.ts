export type Direction = 'ltr' | 'rtl';

export function setDirection(dir: Direction) {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('data-direction', dir);
  }
}

export function getDirection(): Direction {
  if (typeof document !== 'undefined') {
    return (document.documentElement.dir as Direction) || 'ltr';
  }
  return 'ltr';
}
