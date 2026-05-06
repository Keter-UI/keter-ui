import { Copy, Sparkles, Terminal } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Button, Card } from '../ui/KeterUI';

export const AISection = () => {
  const { t, direction } = useAppContext();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
             <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                <Sparkles size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">{t.ai.title}</span>
             </div>
             <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                Generate interfaces <br /> faster than ever.
             </h2>
             <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Keter UI integrates deeply with LLMs. Each component is optimized for GPT and Claude to understand its structure, props, and styling conventions perfectly.
             </p>

             <div className="space-y-4">
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-900/10">
                   <p className="text-sm italic font-medium text-blue-800 dark:text-blue-300">
                      "{t.ai.prompt}"
                   </p>
                </div>
                
                <div className="group relative flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                   <div className="flex items-center gap-3 font-mono text-sm leading-none">
                      <Terminal size={14} className="text-zinc-400" />
                      <span>{t.ai.install}</span>
                   </div>
                   <button 
                      onClick={() => copyToClipboard(t.ai.install)}
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                   >
                      <Copy size={16} />
                   </button>
                </div>
             </div>
          </div>

          <div className="relative">
             <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl dark:from-blue-500/10 dark:to-purple-500/10" />
             <Card className="relative border-zinc-200 dark:border-zinc-800 bg-zinc-950 !p-0 overflow-hidden min-h-[300px]">
                <div className="bg-zinc-900 p-3 border-b border-zinc-800 flex items-center gap-1.5">
                   <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                   <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                   <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="p-6 font-mono text-xs leading-relaxed text-zinc-400">
                   <div className="flex gap-4">
                      <span className="text-zinc-600">1</span>
                      <span className="text-blue-400">import</span> {'{'} Button, Card {'}'} <span className="text-blue-400">from</span> <span className="text-green-400">'@keter-ui/react'</span>;
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">2</span>
                      <span>&nbsp;</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">3</span>
                      <span className="text-blue-400">export default function</span> <span className="text-yellow-400">Dashboard</span>() {'{'}
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">4</span>
                      <span>&nbsp;&nbsp;<span className="text-blue-400">return</span> (</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">5</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-purple-400">Card</span> className=<span className="text-green-400">"p-6"</span>{'>'}</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">6</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-purple-400">Button</span> variant=<span className="text-green-400">"primary"</span>{'>'}Create Dashboard{'</'}<span className="text-purple-400">Button</span>{'>'}</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">7</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;{'</'}<span className="text-purple-400">Card</span>{'>'}</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">8</span>
                      <span>&nbsp;&nbsp;);</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-zinc-600">9</span>
                      <span>{'}'}</span>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
