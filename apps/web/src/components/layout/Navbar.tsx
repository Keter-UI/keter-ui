import { Moon, Sun, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/KeterUI';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { i18n } = useTranslation();
  const { isDark, setIsDark } = useAppContext();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img
            src={isDark ? '/icon-w.svg' : '/icon-b.svg'}
            alt="Keter UI"
            className="h-8 w-8 transition-transform group-hover:scale-110"
          />
          <span className="text-xl font-bold tracking-tight">Keter UI</span>
        </Link>

        {/* Center nav */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link to="/docs" className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
            Documentation
          </Link>
          <Link to="/components" className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
            Components
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="hidden md:flex items-center gap-1 border-e border-zinc-200 dark:border-zinc-800 pe-3 me-1">
            {(['en', 'pt', 'es', 'he']).map((l) => (
              <button
                key={l}
                onClick={() => changeLanguage(l)}
                className={`px-2 py-1 text-[10px] uppercase font-black rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                  i18n.language === l ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-zinc-400'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/Keter-UI/keter-ui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Github size={18} />
            </Button>
          </a>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="h-9 w-9 rounded-full"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* CTA */}
          <Link to="/dashboard" className="hidden sm:block">
            <Button size="sm">Try Dashboard</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
