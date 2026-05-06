export const fontFamily = {
  sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  mono:  ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
  serif: ['Georgia', 'Times New Roman', 'serif'],
} as const;

export const fontSize = {
  '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.02em' }],
  xs:    ['0.75rem',  { lineHeight: '1rem',     letterSpacing: '0.01em' }],
  sm:    ['0.875rem', { lineHeight: '1.25rem',  letterSpacing: '0' }],
  base:  ['1rem',     { lineHeight: '1.5rem',   letterSpacing: '0' }],
  lg:    ['1.125rem', { lineHeight: '1.75rem',  letterSpacing: '-0.01em' }],
  xl:    ['1.25rem',  { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
  '2xl': ['1.5rem',   { lineHeight: '2rem',     letterSpacing: '-0.02em' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem',  letterSpacing: '-0.02em' }],
  '4xl': ['2.25rem',  { lineHeight: '2.75rem',  letterSpacing: '-0.03em' }],
  '5xl': ['3rem',     { lineHeight: '3.5rem',   letterSpacing: '-0.04em' }],
  '6xl': ['3.75rem',  { lineHeight: '1',        letterSpacing: '-0.04em' }],
  '7xl': ['4.5rem',   { lineHeight: '1',        letterSpacing: '-0.05em' }],
} as const;

export const fontWeight = {
  thin:       '100',
  extralight: '200',
  light:      '300',
  regular:    '400',
  medium:     '500',
  semibold:   '600',
  bold:       '700',
  extrabold:  '800',
  black:      '900',
} as const;

export const lineHeight = {
  none:    '1',
  tight:   '1.25',
  snug:    '1.375',
  normal:  '1.5',
  relaxed: '1.625',
  loose:   '2',
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight:   '-0.025em',
  normal:  '0em',
  wide:    '0.025em',
  wider:   '0.05em',
  widest:  '0.1em',
} as const;

export const typography = { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } as const;
