import { useAppContext } from '../../context/AppContext';
import { Card, Button } from '../ui/KeterUI';
import { LayoutGrid, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboards = () => {
  const { t } = useAppContext();

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Powerful Dashboard Templates
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
             Start with pre-built layouts optimized for data density and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Admin Dashboard Preview */}
           <Link to="/dashboard" className="block outline-none">
              <Card className="group !p-0 overflow-hidden border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all hover:-translate-y-1">
                 <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <LayoutGrid size={16} className="text-zinc-500" />
                       <span className="text-sm font-semibold">Admin Dashboard</span>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                       View Demo
                    </Button>
                 </div>
                 <div className="h-64 bg-white dark:bg-zinc-900 p-6">
                    <div className="flex gap-4 h-full">
                       <div className="w-1/4 space-y-2">
                          <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                          <div className="h-2 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
                          <div className="h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
                       </div>
                       <div className="w-3/4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="h-20 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30" />
                             <div className="h-20 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800" />
                          </div>
                          <div className="h-full rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800" />
                       </div>
                    </div>
                 </div>
              </Card>
           </Link>

           {/* Analytics Dashboard Preview */}
           <Link to="/dashboard" className="block outline-none">
              <Card className="group !p-0 overflow-hidden border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all hover:-translate-y-1">
                 <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <BarChart3 size={16} className="text-zinc-500" />
                       <span className="text-sm font-semibold">Analytics View</span>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                       View Demo
                    </Button>
                 </div>
                 <div className="h-64 bg-white dark:bg-zinc-900 p-6">
                    <div className="space-y-6">
                       <div className="flex justify-between items-end gap-2 h-32">
                          {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3].map((h, i) => (
                             <div 
                                key={i} 
                                className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-t-md relative overflow-hidden"
                                style={{ height: `${h * 100}%` }}
                             >
                                <div className="absolute inset-0 bg-blue-500/20" />
                             </div>
                          ))}
                       </div>
                       <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map(i => (
                             <div key={i} className="h-12 rounded bg-zinc-50 dark:bg-zinc-800/50" />
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
