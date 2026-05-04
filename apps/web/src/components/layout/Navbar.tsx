import { Moon, Sun, Github } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/KeterUI';
import { Language } from '../../locales';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { lang, setLang, isDark, setIsDark } = useAppContext();

  const toggleLang = (l: Language) => setLang(l);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-white transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tight">Keter UI</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
           <Link to="/docs" className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">Documentation</Link>
           <Link to="/dashboard" className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">Dashboard</Link>
           <Link to="/components" className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">Components</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1 border-e border-zinc-200 dark:border-zinc-800 pe-4 me-2">
             {(['en', 'pt', 'es', 'he'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => toggleLang(l)}
                  className={`px-2 py-1 text-[10px] uppercase font-black rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${lang === l ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-zinc-400'}`}
                >
                  {l}
                </button>
             ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="w-10 rounded-full"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Link to="/dashboard" className="hidden sm:block">
             <Button size="sm">Try Dashboard</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
