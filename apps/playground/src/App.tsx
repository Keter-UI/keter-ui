import React, { useState } from 'react';

// ─── Inline token-based components (no workspace deps needed for standalone preview) ───

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

function Button({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)] active:bg-[var(--primary-700)]',
    secondary: 'bg-[var(--secondary-500)] text-white hover:bg-[var(--secondary-600)]',
    ghost: 'bg-transparent hover:bg-[var(--primary-50)] text-[var(--primary-600)] border border-[var(--border)]',
    danger: 'bg-[var(--danger-500)] text-white hover:bg-[var(--danger-600)]',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3' };
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className
      )}
      {...props}
    >
      {isLoading && <span className="me-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; helperText?: string;
}
function Input({ className, label, error, helperText, ...props }: InputProps) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-[var(--secondary-600)]">{label}</label>}
      <input
        className={cn(
          'flex h-10 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] disabled:opacity-50',
          error && 'border-[var(--danger-500)] focus:ring-[var(--danger-500)]', className
        )}
        {...props}
      />
      {error && <p className="text-xs text-[var(--danger-500)]">{error}</p>}
      {helperText && !error && <p className="text-xs text-[var(--muted)]">{helperText}</p>}
    </div>
  );
}

// Card
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-xl border border-[var(--border)] bg-white shadow-sm', className)}>{children}</div>;
}
function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-[var(--border)] p-4">
      <h4 className="text-base font-bold text-[var(--secondary-700)]">{title}</h4>
      {subtitle && <p className="text-sm text-[var(--muted)] mt-0.5">{subtitle}</p>}
    </div>
  );
}
function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}

// Modal
function Modal({ isOpen, onClose, title, children, footer }: {
  isOpen: boolean; onClose: () => void; title?: string;
  children: React.ReactNode; footer?: React.ReactNode;
}) {
  React.useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--secondary-700)]">{title}</h3>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--secondary-600)] p-1">✕</button>
        </div>
        <div className="text-[var(--secondary-600)] text-sm">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

// Table
interface Column<T> { key: keyof T; header: string; sortable?: boolean; }
function Table<T extends Record<string, any>>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    return a[sortKey] < b[sortKey] ? (sortOrder === 'asc' ? -1 : 1) : a[sortKey] > b[sortKey] ? (sortOrder === 'asc' ? 1 : -1) : 0;
  });
  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortOrder('asc'); }
  };
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[var(--secondary-50)] text-[var(--secondary-600)] text-xs font-semibold uppercase">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="px-4 py-3 cursor-pointer hover:bg-[var(--secondary-100)]"
                  onClick={() => col.sortable && handleSort(col.key)}>
                <span className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortKey === col.key && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--secondary-50)]">
          {sorted.map((row, i) => (
            <tr key={i} className="hover:bg-[var(--primary-50)]/30 transition-colors">
              {columns.map(col => (
                <td key={String(col.key)} className="px-4 py-3 text-[var(--secondary-700)]">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Badge
function Badge({ label, color = 'primary' }: { label: string; color?: 'primary' | 'success' | 'danger' | 'warning' }) {
  const colors = {
    primary: 'bg-[var(--primary-50)] text-[var(--primary-600)]',
    success: 'bg-[var(--success-50)] text-[var(--success-600)]',
    danger: 'bg-[var(--danger-50)] text-[var(--danger-600)]',
    warning: 'bg-[var(--warning-50)] text-[var(--warning-500)]',
  };
  return <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold', colors[color])}>{label}</span>;
}

// Section wrapper
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--muted)] mb-4">{title}</h2>
      {children}
    </section>
  );
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const tableData = [
  { name: 'Alice Johnson', role: 'Admin', status: 'Active', joined: '2025-01-10' },
  { name: 'Bob Smith', role: 'Editor', status: 'Inactive', joined: '2025-03-22' },
  { name: 'Carol White', role: 'User', status: 'Active', joined: '2025-07-05' },
  { name: 'Dave Brown', role: 'User', status: 'Active', joined: '2026-01-18' },
];

const tableColumns = [
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'role' as const, header: 'Role', sortable: true },
  { key: 'status' as const, header: 'Status' },
  { key: 'joined' as const, header: 'Joined', sortable: true },
];

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [rtl, setRtl] = useState(false);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
  };

  const toggleRTL = () => {
    const next = !rtl;
    setRtl(next);
    document.documentElement.dir = next ? 'rtl' : 'ltr';
  };

  const handleLoadingDemo = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--foreground)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-white/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--primary-600)] text-lg">Keter UI</span>
            <span className="text-xs bg-[var(--primary-50)] text-[var(--primary-600)] px-2 py-0.5 rounded-full font-semibold">Playground</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={toggleRTL}>
              {rtl ? '← LTR' : 'RTL →'}
            </Button>
            <Button size="sm" variant="ghost" onClick={toggleDark}>
              {darkMode ? '☀ Light' : '☾ Dark'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Buttons */}
        <Section title="Button">
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button size="sm" variant="primary">Small</Button>
            <Button size="md" variant="primary">Medium</Button>
            <Button size="lg" variant="primary">Large</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Disabled</Button>
            <Button isLoading={loadingBtn} onClick={handleLoadingDemo} variant="primary">
              {loadingBtn ? 'Loading...' : 'Click to load'}
            </Button>
          </div>
        </Section>

        {/* Input */}
        <Section title="Input">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <Input label="Email" type="email" placeholder="you@example.com" helperText="Used for login only." />
            <Input label="Password" type="password" error="Must be at least 8 characters." />
            <Input label="Username" placeholder="johndoe" />
            <Input label="Disabled" placeholder="Can't edit" disabled />
          </div>
        </Section>

        {/* Modal */}
        <Section title="Modal">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Action"
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="danger" size="sm" onClick={() => setModalOpen(false)}>Delete</Button>
              </>
            }
          >
            <p>Are you sure? This action is permanent and cannot be undone.</p>
          </Modal>
        </Section>

        {/* Card */}
        <Section title="Card">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'Total Revenue', value: '$48,295', change: '+12.5%', positive: true },
              { title: 'Active Users', value: '3,842', change: '+8.1%', positive: true },
              { title: 'Churn Rate', value: '2.3%', change: '-0.4%', positive: false },
            ].map((m) => (
              <Card key={m.title}>
                <CardBody>
                  <p className="text-sm text-[var(--muted)] mb-1">{m.title}</p>
                  <p className="text-2xl font-bold text-[var(--secondary-800)]">{m.value}</p>
                  <p className={cn('text-xs font-medium mt-1', m.positive ? 'text-[var(--success-600)]' : 'text-[var(--danger-500)]')}>
                    {m.change}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badge">
          <div className="flex flex-wrap gap-3">
            <Badge label="Primary" color="primary" />
            <Badge label="Success" color="success" />
            <Badge label="Danger" color="danger" />
            <Badge label="Warning" color="warning" />
          </div>
        </Section>

        {/* Table */}
        <Section title="Table">
          <Card>
            <CardHeader title="Users" subtitle="Click column headers to sort" />
            <CardBody>
              <Table columns={tableColumns} data={tableData} />
            </CardBody>
          </Card>
        </Section>

        {/* Tokens */}
        <Section title="Design Tokens — Color Palette">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {['50', '100', '200', '300', '400', '500', '600', '700'].map(shade => (
              <div key={shade} className="flex flex-col items-center gap-1">
                <div
                  className="h-10 w-10 rounded-lg border border-black/10 shadow-sm"
                  style={{ backgroundColor: `var(--primary-${shade})` }}
                />
                <span className="text-[10px] text-[var(--muted)]">{shade}</span>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-[var(--border)] mt-10 py-6 text-center text-sm text-[var(--muted)]">
        Keter UI Playground — v1.0.0
      </footer>
    </div>
  );
}
