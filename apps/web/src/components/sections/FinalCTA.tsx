import { motion } from 'framer-motion';
import { Button } from '../ui/KeterUI';
import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-zinc-900 dark:bg-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full max-w-4xl bg-blue-500/10 blur-[120px]" />
      
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl mb-8">
            Stop wiring UI. <br />
            <span className="text-blue-400">Start shipping.</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the modern era of UI development. Build faster, better, and more accessible interfaces with Keter UI.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/docs">
              <Button size="lg" className="h-14 px-10 text-lg font-bold gap-3 shadow-2xl shadow-blue-500/20">
                Get Started Now <ArrowRight size={22} />
              </Button>
            </Link>
            <a href="https://github.com/keter-ui/keter-ui" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold gap-3 text-white border-zinc-700 hover:bg-zinc-800">
                <Github size={22} /> View on GitHub
              </Button>
            </a>
          </div>
          
          <p className="mt-12 text-sm text-zinc-500 font-medium">
            Open source. Free forever. MIT Licensed.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
