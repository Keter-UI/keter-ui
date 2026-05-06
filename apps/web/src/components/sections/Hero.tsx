import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/KeterUI';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const { t } = useAppContext();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Gradients */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
        <div className="absolute top-[10%] left-[20%] h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-900/20" />
        <div className="absolute bottom-[10%] right-[20%] h-96 w-96 rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-900/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900">
            Build Faster with Keter
          </span>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/docs">
              <Button size="lg" className="gap-2">
                {t.hero.ctaPrimary} <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                <Play size={18} /> {t.hero.ctaSecondary}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Animated UI Preview */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.2 }}
           className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="aspect-video overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950">
             {/* Mock Dashboard Preview */}
             <div className="grid grid-cols-12 h-full">
                <div className="col-span-3 border-e border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
                   <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                   <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 opacity-50" />
                   <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 opacity-50" />
                </div>
                <div className="col-span-9 p-8">
                   <div className="flex justify-between items-center mb-8">
                      <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map(i => (
                         <div key={i} className="h-32 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" />
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
