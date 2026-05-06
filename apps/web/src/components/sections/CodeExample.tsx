import { Card } from '../ui/KeterUI';

export const CodeExample = () => {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <Card className="!p-0 border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
               <div className="bg-zinc-900 p-3 border-b border-zinc-800 flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="ml-2 text-[10px] text-zinc-500 font-mono">App.tsx</span>
               </div>
               <div className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">1</span>
                     <span className="text-purple-400">import</span> {'{'} <span className="text-zinc-100">Button, Dashboard</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@keter-ui/react'</span>;
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">2</span>
                     <span>&nbsp;</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">3</span>
                     <span className="text-purple-400">export default function</span> <span className="text-yellow-300">Layout</span>() {'{'}
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">4</span>
                     <span>&nbsp;&nbsp;<span className="text-purple-400">return</span> (</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">5</span>
                     <span>&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-blue-400">Dashboard</span>{' dir='}<span className="text-green-400">"rtl"</span>{'>'}</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">6</span>
                     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-blue-400">Button</span>{' variant='}<span className="text-green-400">"primary"</span>{'>'}</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">7</span>
                     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create New Task</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">8</span>
                     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'</'}<span className="text-blue-400">Button</span>{'>'}</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">9</span>
                     <span>&nbsp;&nbsp;&nbsp;&nbsp;{'</'}<span className="text-blue-400">Dashboard</span>{'>'}</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">10</span>
                     <span>&nbsp;&nbsp;);</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-zinc-600 select-none w-4">11</span>
                     <span>{'}'}</span>
                  </div>
               </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-6">
              Clean API. <br />
              <span className="text-blue-600 dark:text-blue-400">Zero Boilerplate.</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              We took the best ideas from shadcn/ui and Radix, then added native RTL support and a powerful layout engine. The result is a UI system that feels familiar but works better.
            </p>
            <ul className="space-y-4">
              {[
                'Fully typed props with TypeScript',
                'Native RTL support in every component',
                'Accessible by default (A11y)',
                'Highly composable architecture'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Check = ({ size, strokeWidth }: { size: number; strokeWidth: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
