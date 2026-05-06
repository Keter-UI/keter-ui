import { Github, ExternalLink } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { isDark } = useAppContext();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <img
                src={isDark ? '/icon-w.svg' : '/icon-b.svg'}
                alt="Keter UI"
                className="h-7 w-7 transition-transform group-hover:scale-110"
              />
              <span className="font-bold text-lg tracking-tight">Keter UI</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Production-grade React UI system. AI-native, RTL-first, built for modern developers worldwide.
            </p>
            <a
              href="https://github.com/Keter-UI/keter-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              <Github size={16} />
              <span>github.com/Keter-UI/keter-ui</span>
            </a>
          </div>

          {/* Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Documentation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Getting Started', to: '/docs' },
                { label: 'Components', to: '/components' },
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'RTL Guide', to: '/docs' },
                { label: 'CLI Tool', to: '/docs' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Resources</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'npm — @keter-ui/react', href: 'https://www.npmjs.com/org/keter-ui' },
                { label: 'GitHub', href: 'https://github.com/Keter-UI/keter-ui' },
                { label: 'Changelog', href: 'https://github.com/Keter-UI/keter-ui/releases' },
                { label: 'Issues', href: 'https://github.com/Keter-UI/keter-ui/issues' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors inline-flex items-center gap-1"
                  >
                    {label}
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
              ))}
              <li>
                <Link to="/legal" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Keter Design Systems — Built by{' '}
            <a
              href="https://yaakovcarioca.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors underline underline-offset-2"
            >
              Douglas Yaakov
            </a>
          </p>
          <p className="text-[11px] text-zinc-300 dark:text-zinc-700 select-none">
            עם ישראל חי
          </p>
        </div>
      </div>
    </footer>
  );
};
