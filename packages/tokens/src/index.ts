export * from './colors';
export * from './spacing';
export * from './radius';
export * from './typography';

import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { typography } from './typography';

export const tokens = { colors, spacing, radius, typography } as const;

export function generateCSSVariables(theme: 'light' | 'dark' = 'light'): string {
  const isDark = theme === 'dark';
  return `
:root {
  --primary-50: ${isDark ? '#082f49' : colors.primary[50]};
  --primary-100: ${isDark ? '#0c4a6e' : colors.primary[100]};
  --primary-500: ${isDark ? '#38bdf8' : colors.primary[500]};
  --primary-600: ${isDark ? '#7dd3fc' : colors.primary[600]};
  --primary-700: ${isDark ? '#bae6fd' : colors.primary[700]};

  --secondary-50: ${isDark ? '#1e293b' : colors.secondary[50]};
  --secondary-100: ${isDark ? '#334155' : colors.secondary[100]};
  --secondary-200: ${isDark ? '#475569' : colors.secondary[200]};
  --secondary-300: ${isDark ? '#64748b' : colors.secondary[300]};
  --secondary-400: ${isDark ? '#94a3b8' : colors.secondary[400]};
  --secondary-500: ${isDark ? '#cbd5e1' : colors.secondary[500]};
  --secondary-600: ${isDark ? '#e2e8f0' : colors.secondary[600]};
  --secondary-700: ${isDark ? '#f1f5f9' : colors.secondary[700]};

  --success-500: ${isDark ? '#4ade80' : colors.success[500]};
  --danger-500: ${isDark ? '#f87171' : colors.danger[500]};
  --warning-500: ${isDark ? '#fbbf24' : colors.warning[500]};

  --background: ${isDark ? '#0f172a' : '#ffffff'};
  --foreground: ${isDark ? '#f8fafc' : '#0f172a'};
  --surface: ${isDark ? '#1e293b' : '#f8fafc'};
  --border: ${isDark ? '#334155' : '#e2e8f0'};
  --muted: ${isDark ? '#64748b' : '#94a3b8'};
}
  `.trim();
}
