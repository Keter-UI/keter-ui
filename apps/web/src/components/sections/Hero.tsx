import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/KeterUI';
import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Gradients */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-900/20" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-900/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/50 px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Now in Public Beta
            </span>
          </div>
          
          <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl lg:text-8xl">
            {t('hero.title').split(' ').slice(0, 2).join(' ')} <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('hero.title').split(' ').slice(2).join(' ')}</span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/docs">
              <Button size="lg" className="h-12 px-8 text-base font-semibold gap-2 shadow-lg shadow-blue-500/20">
                {t('hero.ctaPrimary')} <ArrowRight size={20} />
              </Button>
            </Link>
            <a href="https://github.com/keter-ui/keter-ui" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold gap-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <Github size={20} /> GitHub
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Animated UI Preview */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.2 }}
           className="mt-24 relative mx-auto max-w-6xl"
        >
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl dark:from-blue-500/10 dark:to-purple-500/10" />
          <div className="relative rounded-2xl border border-zinc-200 bg-white/80 p-2 shadow-2xl backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
               {/* Mock Dashboard Preview */}
               <div className="grid grid-cols-12 h-full">
                  <div className="col-span-3 border-e border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
                     <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                     <div className="space-y-3">
                        <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 opacity-50" />
                        <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 opacity-50" />
                        <div className="h-3 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 opacity-50" />
                     </div>
                     <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                     </div>
                  </div>
                  <div className="col-span-9 p-8">
                     <div className="flex justify-between items-center mb-10">
                        <div className="space-y-2">
                           <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
                           <div className="h-3 w-32 rounded bg-zinc-100 dark:bg-zinc-900" />
                        </div>
                        <div className="flex gap-2">
                           <div className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                           <div className="h-9 w-24 rounded-lg bg-zinc-900 dark:bg-zinc-50" />
                        </div>
                     </div>
                     <div className="grid grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="h-40 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm" />
                        ))}
                     </div>
                     <div className="mt-8 h-48 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
