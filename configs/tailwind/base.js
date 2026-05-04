module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/react/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
        },
        secondary: {
          50: 'var(--secondary-50)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
        },
        success: 'var(--success-500)',
        danger: 'var(--danger-500)',
      },
    },
  },
  plugins: [],
};
