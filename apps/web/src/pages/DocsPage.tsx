import { useState } from 'react';
import { Card, Button } from '../components/ui/KeterUI';
import { Terminal, Copy, Check, ChevronRight, ChevronDown, ArrowRight, Globe, Zap, Package } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { cn } from '../lib/utils';

// ─── Sidebar nav config ───────────────────────────────────────────────────────

const NAV = [
  {
    group: 'Getting Started',
    items: [
      { id: 'installation',    label: 'Installation' },
      { id: 'cli',             label: 'CLI Reference' },
      { id: 'theming',         label: 'Theming' },
    ],
  },
  {
    group: 'Design System',
    items: [
      { id: 'tokens',       label: 'Design Tokens' },
      { id: 'typography',   label: 'Typography' },
      { id: 'colors',       label: 'Colors' },
    ],
  },
  {
    group: 'Core',
    items: [
      { id: 'variants',     label: 'Variant System' },
      { id: 'cn',           label: 'cn() Utility' },
    ],
  },
  {
    group: 'RTL',
    items: [
      { id: 'rtl-overview', label: 'Overview' },
      { id: 'rtl-hooks',    label: 'Hooks' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'comp-button',    label: 'Button' },
      { id: 'comp-input',     label: 'Input' },
      { id: 'comp-modal',     label: 'Modal' },
      { id: 'comp-form',      label: 'Form' },
      { id: 'comp-table',     label: 'Table' },
    ],
  },
];

// ─── Code block ───────────────────────────────────────────────────────────────

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {copied ? (
            <><Check size={12} className="text-green-500" /> Copied</>
          ) : (
            <><Copy size={12} /> Copy</>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Section content ──────────────────────────────────────────────────────────

const SECTIONS: Record<string, React.ReactNode> = {
  installation: (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Installation</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Keter UI works with Next.js, Vite, Remix, and Astro. Get started with the CLI or manually.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: <Zap size={20} />, title: 'CLI (Recommended)', desc: 'Auto-detects your framework and configures everything.' },
          { icon: <Package size={20} />, title: 'Manual', desc: 'Install packages directly and configure manually.' },
          { icon: <Globe size={20} />, title: 'CDN', desc: 'Use the pre-built bundle for quick prototyping.' },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-2 hover:border-blue-300 dark:hover:border-blue-800 transition-colors">
            <div className="text-blue-600 dark:text-blue-400">{card.icon}</div>
            <h3 className="font-semibold text-sm">{card.title}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{card.desc}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Start with CLI</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Run this in your project root. The CLI will detect your framework and set up everything automatically.
        </p>
        <CodeBlock code="npx keter-ui init" lang="bash" />
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 p-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            The CLI will install packages, set up CSS tokens, configure Tailwind, and create a{' '}
            <code className="font-mono bg-blue-100 dark:bg-blue-950 px-1 rounded">keter.config.ts</code> file.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Manual Installation</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Install the packages you need:</p>
        <CodeBlock
          code={`# Core library + design tokens
pnpm add @keter-ui/react @keter-ui/tokens

# RTL utilities (optional)
pnpm add @keter-ui/rtl`}
          lang="bash"
        />

        <h3 className="text-lg font-semibold mt-6">Configure CSS</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Import the tokens in your global CSS:</p>
        <CodeBlock
          code={`@import 'tailwindcss';
@import '@keter-ui/tokens/css';`}
          lang="css"
        />

        <h3 className="text-lg font-semibold mt-6">Use components</h3>
        <CodeBlock
          code={`import { Button, Input, Modal } from '@keter-ui/react';

export default function App() {
  return (
    <Button variant="primary" size="lg">
      Hello, Keter UI
    </Button>
  );
}`}
          lang="tsx"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Requirements</h2>
        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
          {['React 18+', 'Tailwind CSS 4.0+', 'TypeScript 5.0+ (recommended)', 'Node 18+'].map((r) => (
            <li key={r} className="flex items-center gap-2">
              <span className="text-green-500">✓</span> {r}
            </li>
          ))}
        </ul>
      </section>
    </div>
  ),

  cli: (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">CLI Reference</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          The <code className="font-mono text-blue-600 dark:text-blue-400">keter-ui</code> CLI helps you initialize projects and add components.
        </p>
      </div>

      <section className="space-y-6">
        {[
          {
            cmd: 'npx keter-ui init',
            desc: 'Initialize Keter UI in your project. Detects framework (Next.js, Vite, Remix, Astro), installs dependencies, sets up Tailwind and design tokens.',
            flags: [
              { flag: '--yes, -y', desc: 'Skip confirmation prompts' },
              { flag: '--cwd <path>', desc: 'Set working directory' },
            ],
          },
          {
            cmd: 'npx keter-ui add [component]',
            desc: 'Add a component example to your project. Generates a .tsx file in src/components/ui/.',
            flags: [
              { flag: '--dir <path>', desc: 'Output directory (default: src/components/ui)' },
              { flag: '--cwd <path>', desc: 'Set working directory' },
            ],
          },
          {
            cmd: 'npx keter-ui list',
            desc: 'List all available components.',
            flags: [],
          },
        ].map((item) => (
          <div key={item.cmd} className="space-y-3">
            <CodeBlock code={item.cmd} lang="bash" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
            {item.flags.length > 0 && (
              <div className="rounded-lg border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 dark:bg-zinc-900">
                    <tr>
                      <th className="text-start px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Flag</th>
                      <th className="text-start px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.flags.map((f) => (
                      <tr key={f.flag} className="border-t border-zinc-100 dark:border-zinc-800">
                        <td className="px-4 py-2 font-mono text-xs text-blue-600 dark:text-blue-400">{f.flag}</td>
                        <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  ),

  theming: (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Theming</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Keter UI uses CSS variables for seamless dark/light mode and easy customization.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Dark Mode</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Add the <code className="font-mono text-blue-600 dark:text-blue-400">dark</code> class to <code className="font-mono text-blue-600 dark:text-blue-400">{'<html>'}</code> to enable dark mode. Keter UI uses the <code className="font-mono text-blue-600 dark:text-blue-400">class</code> strategy.</p>
        <CodeBlock
          code={`// Toggle dark mode
document.documentElement.classList.toggle('dark');

// With React state
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark);
}, [isDark]);`}
          lang="tsx"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Colors</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Override CSS variables in your global stylesheet:</p>
        <CodeBlock
          code={`:root {
  --brand-bg:       #7c3aed; /* purple brand */
  --brand-bg-hover: #6d28d9;
  --brand-text:     #7c3aed;
}

.dark {
  --brand-bg:       #8b5cf6;
  --brand-bg-hover: #a78bfa;
  --brand-text:     #a78bfa;
}`}
          lang="css"
        />
      </section>
    </div>
  ),

  tokens: (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Design Tokens</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          All design decisions are tokenized — colors, spacing, typography, radius, and shadows.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock code={`import { neutral, brand, spacing, radius } from '@keter-ui/tokens';`} lang="tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">CSS Variables</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Import the pre-built CSS variables:</p>
        <CodeBlock code={`@import '@keter-ui/tokens/css';`} lang="css" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ['--fg-base', 'Foreground'],
            ['--fg-muted', 'Muted text'],
            ['--bg-base', 'Background'],
            ['--surface-base', 'Surface'],
            ['--border-base', 'Border'],
            ['--brand-bg', 'Brand'],
            ['--success-fg', 'Success'],
            ['--danger-fg', 'Danger'],
          ].map(([varName, label]) => (
            <div key={varName} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 space-y-1">
              <div className="h-8 rounded-md" style={{ background: `var(${varName})` }} />
              <p className="text-xs font-mono text-zinc-500 truncate">{varName}</p>
              <p className="text-xs text-zinc-400">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),

  'rtl-overview': (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">RTL Overview</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          RTL (Right-to-Left) is a first-class feature in Keter UI — not an afterthought. All components use CSS logical properties natively.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Supported Languages</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['ar', 'Arabic'], ['he', 'Hebrew'], ['fa', 'Persian'], ['ur', 'Urdu']].map(([code, name]) => (
            <div key={code} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 text-center">
              <p className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">{code}</p>
              <p className="text-xs text-zinc-400">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Setup</h2>
        <CodeBlock
          code={`import { applyDocumentDirection, isRTLLocale } from '@keter-ui/rtl';

// Apply direction based on locale
applyDocumentDirection(isRTLLocale('he') ? 'rtl' : 'ltr', 'he');`}
          lang="tsx"
        />
        <CodeBlock
          code={`// Tailwind: use logical properties
<div className="ps-4 pe-4 ms-2">  {/* ✓ RTL-safe */}
<div className="pl-4 pr-4 ml-2">  {/* ✗ physical properties */}`}
          lang="tsx"
        />
      </section>
    </div>
  ),

  'rtl-hooks': (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">RTL Hooks</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">React hooks for direction detection and management.</p>
      </div>

      <section className="space-y-4">
        {[
          {
            name: 'useDirection()',
            desc: 'Returns the current document direction, reactive to changes.',
            code: `import { useDirection } from '@keter-ui/rtl';

function MyComponent() {
  const dir = useDirection(); // 'ltr' | 'rtl'
  return <div>Direction: {dir}</div>;
}`,
          },
          {
            name: 'useIsRTL()',
            desc: 'Returns true when the document direction is RTL.',
            code: `import { useIsRTL } from '@keter-ui/rtl';

function NavIcon() {
  const isRTL = useIsRTL();
  return <ChevronRight className={isRTL ? 'rotate-180' : ''} />;
}`,
          },
          {
            name: 'useLocaleDirection(locale)',
            desc: 'Manages direction from a locale string and applies it to the document.',
            code: `import { useLocaleDirection } from '@keter-ui/rtl';

function App({ locale }: { locale: string }) {
  const { dir, isRTL } = useLocaleDirection(locale);
  return <div dir={dir}>...</div>;
}`,
          },
        ].map((h) => (
          <div key={h.name} className="space-y-2">
            <h3 className="text-lg font-semibold font-mono text-blue-600 dark:text-blue-400">{h.name}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{h.desc}</p>
            <CodeBlock code={h.code} lang="tsx" />
          </div>
        ))}
      </section>
    </div>
  ),

  variants: (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Variant System</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          A type-safe CVA-style variant system for building consistent component APIs.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <CodeBlock
          code={`import { variants } from '@keter-ui/core';

const buttonVariants = variants({
  base: 'inline-flex items-center rounded-lg font-medium transition-all',
  variants: {
    variant: {
      primary:   'bg-zinc-900 text-zinc-50 hover:bg-zinc-800',
      secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
      outline:   'border border-zinc-200 hover:bg-zinc-50',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// Usage
<button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
  Click me
</button>`}
          lang="tsx"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Compound Variants</h2>
        <CodeBlock
          code={`const buttonVariants = variants({
  variants: {
    variant: { outline: '...', primary: '...' },
    size:    { sm: '...', lg: '...' },
  },
  compoundVariants: [
    {
      variant: 'outline',
      size: 'lg',
      class: 'border-2', // applied only when both match
    },
  ],
});`}
          lang="tsx"
        />
      </section>
    </div>
  ),

  cn: (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">cn() Utility</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Merges Tailwind classes intelligently, resolving conflicts with <code className="font-mono text-blue-600 dark:text-blue-400">tailwind-merge</code>.
        </p>
      </div>
      <CodeBlock
        code={`import { cn } from '@keter-ui/core';

// Merge classes, resolving Tailwind conflicts
cn('px-4 py-2', 'px-6')       // → 'py-2 px-6'
cn('text-red-500', condition && 'text-green-500') // → conditional
cn('rounded-lg', { 'border border-zinc-200': hasBorder })`}
        lang="tsx"
      />
    </div>
  ),
};

// Fallback for sections not yet written
const fallback = (id: string) => (
  <div className="space-y-6">
    <h1 className="text-4xl font-extrabold tracking-tight">{id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</h1>
    <p className="text-zinc-500 dark:text-zinc-400">Documentation coming soon.</p>
  </div>
);

// ─── Docs page ────────────────────────────────────────────────────────────────

export const DocsPage = () => {
  const [activeId, setActiveId] = useState('installation');
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(NAV.map((n) => n.group)));

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group); else next.add(group);
      return next;
    });
  };

  const content = SECTIONS[activeId] ?? fallback(activeId);

  const flatItems = NAV.flatMap((g) => g.items);
  const currentIdx = flatItems.findIndex((i) => i.id === activeId);
  const prev = flatItems[currentIdx - 1];
  const next = flatItems[currentIdx + 1];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar */}
          <aside className="w-full lg:w-56 shrink-0">
            <nav className="space-y-6">
              {NAV.map(({ group, items }) => {
                const isOpen = openGroups.has(group);
                return (
                  <div key={group}>
                    <button
                      onClick={() => toggleGroup(group)}
                      className="flex w-full items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                    >
                      {group}
                      <ChevronDown size={12} className={cn('transition-transform', !isOpen && '-rotate-90')} />
                    </button>
                    {isOpen && (
                      <div className="space-y-0.5">
                        {items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={cn(
                              'w-full text-start px-3 py-2 text-sm rounded-lg transition-colors',
                              activeId === item.id
                                ? 'bg-zinc-100 text-zinc-950 font-semibold dark:bg-zinc-900 dark:text-zinc-50'
                                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:text-zinc-50 dark:hover:bg-zinc-900/50'
                            )}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0 max-w-3xl">
            {content}

            {/* Pagination */}
            <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
              {prev ? (
                <button
                  onClick={() => setActiveId(prev.id)}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  <ChevronRight size={14} className="rotate-180" />
                  {prev.label}
                </button>
              ) : <span />}
              {next ? (
                <button
                  onClick={() => setActiveId(next.id)}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors ms-auto"
                >
                  {next.label}
                  <ChevronRight size={14} />
                </button>
              ) : <span />}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
