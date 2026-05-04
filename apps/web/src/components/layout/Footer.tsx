import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <Link to="/" className="flex items-center gap-2 group">
              <div className="h-6 w-6 rounded bg-zinc-900 dark:bg-white transition-transform group-hover:scale-110" />
              <span className="font-bold tracking-tight">Keter UI</span>
           </Link>
           
           <div className="flex gap-8 text-sm text-zinc-500">
              <Link to="/docs" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-medium">Docs</Link>
              <Link to="/components" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-medium">Components</Link>
              <Link to="/dashboard" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-medium">Dashboard</Link>
              <Link to="/legal" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-medium">Privacy & Terms</Link>
           </div>

           <p className="text-xs text-zinc-400">
              © 2024 Keter Design Systems. Built with AI.
           </p>
        </div>
      </div>
    </footer>
  );
};
