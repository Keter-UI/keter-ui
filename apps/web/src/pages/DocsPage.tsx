import { useState } from 'react';
import { Card, Button } from '../components/ui/KeterUI';
import { Terminal, Copy, Check, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const DocsPage = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('npm install @keter-ui/react');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Docs Sidebar */}
          <aside className="w-full lg:w-64 space-y-8 shrink-0">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Getting Started</h4>
              <nav className="flex flex-col gap-2">
                <DocLink active>Installation</DocLink>
                <DocLink>CLI Reference</DocLink>
                <DocLink>Theming</DocLink>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Components</h4>
              <nav className="flex flex-col gap-2">
                <DocLink>Button</DocLink>
                <DocLink>Input</DocLink>
                <DocLink>Modal</DocLink>
                <DocLink>Card</DocLink>
                <DocLink>Switch</DocLink>
              </nav>
            </div>
          </aside>

          {/* Docs Content */}
          <main className="flex-1 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Installation</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10">
              Keter UI is built to be installed into your project using our CLI or via direct package manager installation.
            </p>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Quick Start</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                The fastest way to get started is by using our initialization CLI which sets up Tailwind and our theme tokens automatically.
              </p>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition" />
                <div className="relative flex items-center justify-between bg-zinc-950 rounded-xl p-4 font-mono text-sm">
                  <div className="flex items-center gap-3">
                    <Terminal size={14} className="text-zinc-500" />
                    <span className="text-zinc-300">npx keter-ui init</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-500 hover:text-white">
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
            </section>

            <section className="mt-16 space-y-6">
              <h2 className="text-2xl font-bold">Manual Installation</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                If you prefer to manage dependencies yourself, install the core library:
              </p>
              
              <div className="bg-zinc-950 rounded-xl p-4 font-mono text-sm relative group">
                <div className="flex items-center justify-between text-zinc-300">
                   <div className="flex items-center gap-3">
                      <Terminal size={14} className="text-zinc-500" />
                      <span>npm install @keter-ui/react</span>
                   </div>
                   <button onClick={copyCommand} className="text-zinc-500 hover:text-white transition">
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                   </button>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-blue-100 bg-blue-50/20 dark:border-blue-900/30 dark:bg-blue-900/10">
                 <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Requirements</h4>
                 <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc ms-4">
                    <li>React 18+</li>
                    <li>Tailwind CSS 3.0+</li>
                    <li>Framer Motion 10+</li>
                 </ul>
              </div>
            </section>

            <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
               <button className="text-sm font-medium flex items-center gap-2 text-zinc-400 cursor-not-allowed">
                  <ChevronRight className="rotate-180" size={14} />
                  Introduction
               </button>
               <button className="text-sm font-medium flex items-center gap-2 hover:text-blue-600 transition">
                  CLI Reference
                  <ChevronRight size={14} />
               </button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const DocLink = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <a 
    href="#" 
    className={cn(
      "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
      active 
        ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50" 
        : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
    )}
  >
    {children}
  </a>
);
