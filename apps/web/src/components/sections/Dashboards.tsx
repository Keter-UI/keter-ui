import { useAppContext } from '../../context/AppContext';
import { Card, Button } from '../ui/KeterUI';
import { LayoutGrid, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboards = () => {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
            Production-Grade Dashboards
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
             Don't start from scratch. Use our pre-built, accessible dashboard layouts designed for maximum data density and professional aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {/* Admin Dashboard Preview */}
           <Link to="/dashboard" className="block group">
              <Card className="!p-0 overflow-hidden border-zinc-200 dark:border-zinc-800 group-hover:shadow-2xl group-hover:border-blue-500/30 transition-all duration-500 group-hover:-translate-y-2">
                 <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <LayoutGrid size={20} />
                       </div>
                       <div>
                          <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-50">Enterprise Admin</span>
                          <span className="block text-xs text-zinc-500">Full Sidebar + Header Navigation</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                       Preview <ArrowRight size={14} />
                    </div>
                 </div>
                 <div className="h-72 bg-zinc-50 dark:bg-zinc-950 p-8">
                    <div className="flex gap-6 h-full">
                       <div className="w-1/4 space-y-3">
                          <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                          <div className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 opacity-60" />
                          <div className="h-2 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800 opacity-60" />
                          <div className="pt-4 space-y-2">
                             <div className="h-1.5 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 opacity-40" />
                             <div className="h-1.5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 opacity-40" />
                          </div>
                       </div>
                       <div className="w-3/4 space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                             <div className="h-24 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm" />
                             <div className="h-24 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm" />
                          </div>
                          <div className="h-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm" />
                       </div>
                    </div>
                 </div>
              </Card>
           </Link>

           {/* Analytics Dashboard Preview */}
           <Link to="/dashboard" className="block group">
              <Card className="!p-0 overflow-hidden border-zinc-200 dark:border-zinc-800 group-hover:shadow-2xl group-hover:border-purple-500/30 transition-all duration-500 group-hover:-translate-y-2">
                 <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                          <BarChart3 size={20} />
                       </div>
                       <div>
                          <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-50">Advanced Analytics</span>
                          <span className="block text-xs text-zinc-500">Data Density + Charting Engine</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                       Preview <ArrowRight size={14} />
                    </div>
                 </div>
                 <div className="h-72 bg-zinc-50 dark:bg-zinc-950 p-8">
                    <div className="space-y-8">
                       <div className="flex justify-between items-end gap-3 h-32 px-4">
                          {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3, 0.5].map((h, i) => (
                             <div 
                                key={i} 
                                className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-t-lg relative overflow-hidden"
                                style={{ height: `${h * 100}%` }}
                             >
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
                             </div>
                          ))}
                       </div>
                       <div className="grid grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map(i => (
                             <div key={i} className="h-16 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm" />
                          ))}
                       </div>
                    </div>
                 </div>
              </Card>
           </Link>
        </div>
      </div>
    </section>
  );
};
