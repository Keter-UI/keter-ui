/**
 * Keter UI — Auto-documentation generator
 *
 * Scans packages/react/src/components and generates MDX doc pages in
 * apps/docs/content/components/.
 *
 * Usage:
 *   npx tsx scripts/generate-docs.ts
 *   npx tsx scripts/generate-docs.ts --dry-run
 */

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_SRC = path.join(ROOT, 'packages', 'react', 'src', 'components');
const DOCS_OUTPUT = path.join(ROOT, 'apps', 'docs', 'content', 'components');

const DRY_RUN = process.argv.includes('--dry-run');

interface PropDef {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

interface ComponentDef {
  name: string;
  description: string;
  props: PropDef[];
  variants?: string[];
}

// ─── Prop extraction ─────────────────────────────────────────────────────────

function extractProps(source: string): PropDef[] {
  const props: PropDef[] = [];
  const interfaceMatch = source.match(/export interface \w+Props[^{]*\{([^}]+)\}/s);
  if (!interfaceMatch) return props;

  const body = interfaceMatch[1];
  const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    const propMatch = line.match(/^(\w+)(\?)?:\s*(.+?);?\s*(?:\/\/\s*(.+))?$/);
    if (!propMatch) continue;
    const [, name, optional, type, description] = propMatch;
    props.push({
      name,
      type: type.trim(),
      required: !optional,
      description: description?.trim(),
    });
  }

  return props;
}

function extractVariants(source: string): string[] {
  const variantMatch = source.match(/variant\?.*?:\s*['"]([^'"]+)['"]\s*\|\s*/g);
  if (!variantMatch) {
    const literalMatch = source.match(/variant.*?:\s*(.+?)[;,]/);
    if (!literalMatch) return [];
    return literalMatch[1]
      .split('|')
      .map((v) => v.trim().replace(/['"]/g, ''))
      .filter(Boolean);
  }
  return [];
}

function extractDescription(source: string): string {
  const commentMatch = source.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
  if (commentMatch) {
    return commentMatch[1]
      .split('\n')
      .map((l) => l.replace(/^\s*\*\s?/, '').trim())
      .filter(Boolean)
      .join(' ');
  }
  return '';
}

// ─── MDX generation ──────────────────────────────────────────────────────────

function generatePropsTable(props: PropDef[]): string {
  if (!props.length) return '';
  const rows = props
    .map(
      (p) =>
        `| \`${p.name}\` | \`${p.type}\` | ${p.required ? '✓' : '—'} | ${p.description ?? '—'} |`
    )
    .join('\n');

  return `## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
${rows}
`;
}

function generateMDX(def: ComponentDef): string {
  const importName = def.name;
  const variantSnippet =
    def.variants && def.variants.length > 0
      ? `\n## Variants\n\n\`\`\`tsx\n${def.variants.map((v) => `<${importName} variant="${v}">${v}</${importName}>`).join('\n')}\n\`\`\`\n`
      : '';

  return `---
title: ${def.name}
description: ${def.description || `${def.name} component from Keter UI.`}
---

# ${def.name}

${def.description || `The \`${def.name}\` component.`}

## Import

\`\`\`tsx
import { ${def.name} } from '@keter-ui/react';
\`\`\`

## Usage

\`\`\`tsx
<${def.name} />
\`\`\`
${variantSnippet}
${generatePropsTable(def.props)}
## Accessibility

- Built on semantic HTML
- Keyboard accessible
- Focus ring always visible

## RTL behavior

The \`${def.name}\` component uses logical CSS properties and works correctly in both LTR and RTL layouts.
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function scanComponents(): ComponentDef[] {
  if (!fs.existsSync(COMPONENTS_SRC)) {
    console.error(`Components directory not found: ${COMPONENTS_SRC}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(COMPONENTS_SRC);
  const defs: ComponentDef[] = [];

  for (const entry of entries) {
    const dir = path.join(COMPONENTS_SRC, entry);
    if (!fs.statSync(dir).isDirectory()) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'));
    if (!files.length) continue;

    const sourceFile = path.join(dir, files[0]);
    const source = fs.readFileSync(sourceFile, 'utf-8');

    const props = extractProps(source);
    const variants = extractVariants(source);
    const description = extractDescription(source);

    // Capitalize component name from dir name
    const name = entry.charAt(0).toUpperCase() + entry.slice(1);

    defs.push({ name, description, props, variants });
    console.log(`  ✓ Scanned: ${name} (${props.length} props)`);
  }

  return defs;
}

function run() {
  console.log('\n  Keter UI — Auto-docs generator');
  console.log('  ─────────────────────────────────\n');

  if (DRY_RUN) console.log('  [DRY RUN — no files will be written]\n');

  console.log('  Scanning components...');
  const components = scanComponents();
  console.log(`\n  Found ${components.length} components\n`);

  if (!DRY_RUN) {
    fs.mkdirSync(DOCS_OUTPUT, { recursive: true });
  }

  // Generate _meta.json
  const meta: Record<string, string> = {};
  for (const def of components) {
    meta[def.name.toLowerCase()] = def.name;
  }

  if (!DRY_RUN) {
    const metaPath = path.join(DOCS_OUTPUT, '_meta.json');
    // Merge with existing _meta.json if present
    let existing: Record<string, string> = {};
    if (fs.existsSync(metaPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      } catch {
        // ignore
      }
    }
    fs.writeFileSync(metaPath, JSON.stringify({ ...existing, ...meta }, null, 2));
    console.log('  ✓ Updated _meta.json');
  }

  // Generate MDX pages
  for (const def of components) {
    const mdx = generateMDX(def);
    const outputPath = path.join(DOCS_OUTPUT, `${def.name.toLowerCase()}.mdx`);

    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would write: ${path.relative(ROOT, outputPath)}`);
      continue;
    }

    // Don't overwrite manually written docs — only write if auto-generated marker or file missing
    if (fs.existsSync(outputPath)) {
      const existing = fs.readFileSync(outputPath, 'utf-8');
      if (!existing.includes('auto-generated')) {
        console.log(`  ⚠ Skipped: ${def.name}.mdx (manual file — no auto-generated marker)`);
        continue;
      }
    }

    fs.writeFileSync(outputPath, `<!-- auto-generated by scripts/generate-docs.ts -->\n${mdx}`);
    console.log(`  ✓ Written: ${path.relative(ROOT, outputPath)}`);
  }

  console.log('\n  Done.\n');
}

run();
