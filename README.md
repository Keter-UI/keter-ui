# Keter UI Monorepo

Production-grade, AI-native, RTL-first UI platform.

## Structure

- `apps/web`: Landing page
- `apps/docs`: Documentation site
- `apps/playground`: Component sandbox
- `packages/react`: UI Components
- `packages/tokens`: Design system
- `packages/core`: Utilities & hooks
- `packages/rtl`: RTL engine
- `packages/cli`: CLI tool

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build all packages:
   ```bash
   pnpm build
   ```

3. Run development mode:
   ```bash
   pnpm dev
   ```

## CLI

Initialize Keter UI in your project:
```bash
npx keter-ui init
```

Add a component:
```bash
npx keter-ui add button
```
