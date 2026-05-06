import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, MessageSquare } from 'lucide-react';
import { Card } from '../ui/KeterUI';

export const AISection = () => {
  const points = [
    {
      title: 'LLM-Optimized Props',
      description: 'Every component prop is named and structured for maximum clarity, helping GPT-4 and Claude generate perfect code.',
      icon: Brain
    },
    {
      title: 'Semantic Structure',
      description: 'Zero "div-soup". Our components use semantic HTML that AI models can understand and manipulate with ease.',
      icon: MessageSquare
    },
    {
      title: 'Context-Aware Styling',
      description: 'Tailwind classes are organized to be predictable and extendable by code generation tools.',
      icon: Cpu
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-blue-400 mb-4"
          >
            <Sparkles size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">AI-Native by Design</span>
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Built for the age of <span className="text-blue-400">AI agents.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Traditional UI libraries were built for humans. Keter UI is built for both humans and the AI tools that help them code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <point.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-blue-500/20 blur-3xl" />
            <Card className="relative border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden !p-0">
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">AI Prompt Context</span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <p className="text-sm text-blue-300 italic">
                    "Generate a responsive analytics dashboard using Keter UI components. Ensure it supports RTL and uses the primary color for all call-to-actions."
                  </p>
                </div>
                <div className="space-y-2">
                   <div className="h-2 w-full rounded bg-zinc-800" />
                   <div className="h-2 w-3/4 rounded bg-zinc-800" />
                   <div className="h-2 w-1/2 rounded bg-zinc-800" />
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Sparkles size={16} />
                    </div>
                    <span className="text-xs font-mono text-zinc-500">Keter AI Engine: Optimization Active</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
