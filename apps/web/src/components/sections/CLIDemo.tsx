import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const CLIDemo = () => {
  const [copied, setCopied] = useState(false);
  const command = "npx keter-ui init";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              From zero to dashboard <br />
              <span className="text-blue-400">in 30 seconds.</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              Skip the boilerplate. Our CLI detects your framework, installs dependencies, and configures Tailwind and RTL support automatically.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-zinc-200">Initialize project</h4>
                  <p className="text-zinc-500 text-sm">Run our init command to set up the foundation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-zinc-200">Add components</h4>
                  <p className="text-zinc-500 text-sm">Pick from 30+ production-ready components.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-zinc-200">Ship to production</h4>
                  <p className="text-zinc-500 text-sm">Fully typed, accessible, and ready for scale.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-blue-500/20 blur-3xl" />
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Terminal</div>
                <div className="w-12" />
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex gap-3 mb-4">
                  <span className="text-green-500">$</span>
                  <span className="text-zinc-300">{command}</span>
                  <button onClick={handleCopy} className="ml-auto text-zinc-600 hover:text-zinc-300 transition-colors">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="space-y-1 text-zinc-500">
                  <p className="text-blue-400">? Which framework are you using? › React</p>
                  <p className="text-blue-400">? Which language? › TypeScript</p>
                  <p className="text-blue-400">? Enable RTL support? › Yes</p>
                  <p className="text-zinc-400 mt-4">✔ Installing dependencies...</p>
                  <p className="text-zinc-400">✔ Creating components directory...</p>
                  <p className="text-zinc-400">✔ Updating tailwind.config.ts...</p>
                  <p className="text-green-400 mt-4 font-bold">Success! Keter UI is ready to use.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
