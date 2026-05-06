import { neutral, brand, success, warning, danger } from './colors.js';

export const lightTheme = {
  // Backgrounds
  'bg-base':     neutral[50],
  'bg-subtle':   neutral[100],
  'bg-muted':    neutral[200],
  'bg-emphasis': neutral[900],

  // Foregrounds
  'fg-base':       neutral[900],
  'fg-muted':      neutral[500],
  'fg-subtle':     neutral[400],
  'fg-on-emphasis': neutral[50],

  // Borders
  'border-base':    neutral[200],
  'border-subtle':  neutral[100],
  'border-strong':  neutral[300],

  // Brand
  'brand-bg':      brand[600],
  'brand-bg-hover': brand[700],
  'brand-fg':      '#ffffff',
  'brand-muted':   brand[100],
  'brand-text':    brand[700],

  // Semantic
  'success-bg':   success[50],
  'success-fg':   success[700],
  'success-border': success[200],

  'warning-bg':   warning[50],
  'warning-fg':   warning[700],
  'warning-border': warning[200],

  'danger-bg':    danger[50],
  'danger-fg':    danger[700],
  'danger-border': danger[200],

  // Surface (cards, panels)
  'surface-base':    '#ffffff',
  'surface-raised':  neutral[50],
  'surface-overlay': '#ffffff',

  // Input
  'input-bg':          '#ffffff',
  'input-border':      neutral[200],
  'input-border-focus': neutral[900],
  'input-placeholder': neutral[400],
} as const;

export const darkTheme = {
  // Backgrounds
  'bg-base':     neutral[950],
  'bg-subtle':   neutral[900],
  'bg-muted':    neutral[800],
  'bg-emphasis': neutral[50],

  // Foregrounds
  'fg-base':       neutral[50],
  'fg-muted':      neutral[400],
  'fg-subtle':     neutral[600],
  'fg-on-emphasis': neutral[950],

  // Borders
  'border-base':   neutral[800],
  'border-subtle': neutral[900],
  'border-strong': neutral[700],

  // Brand
  'brand-bg':      brand[500],
  'brand-bg-hover': brand[400],
  'brand-fg':      '#ffffff',
  'brand-muted':   brand[950],
  'brand-text':    brand[400],

  // Semantic
  'success-bg':     '#052e16',
  'success-fg':     success[400],
  'success-border': success[900],

  'warning-bg':     '#451a03',
  'warning-fg':     warning[400],
  'warning-border': warning[900],

  'danger-bg':     '#4c0519',
  'danger-fg':     danger[400],
  'danger-border': danger[900],

  // Surface
  'surface-base':    neutral[950],
  'surface-raised':  neutral[900],
  'surface-overlay': neutral[900],

  // Input
  'input-bg':           neutral[950],
  'input-border':       neutral[800],
  'input-border-focus': neutral[50],
  'input-placeholder':  neutral[600],
} as const;

export type ThemeKey = keyof typeof lightTheme;
export type Theme = 'light' | 'dark';
