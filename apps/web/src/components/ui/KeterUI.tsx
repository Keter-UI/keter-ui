import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown, ChevronRight, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

// ─── Button ──────────────────────────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary:   'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm',
      secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-[0.98] dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700',
      outline:   'border border-zinc-200 bg-transparent hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-800 dark:hover:bg-zinc-900',
      ghost:     'bg-transparent hover:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700',
      danger:    'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-sm',
      link:      'bg-transparent underline-offset-4 hover:underline text-zinc-900 dark:text-zinc-50 p-0 h-auto',
    };
    const sizes = {
      sm:   'h-8 px-3 text-xs',
      md:   'h-10 px-4 text-sm',
      lg:   'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-0',
    };
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
          variants[variant], sizes[size], className
        )}
        {...props}
      >
        {isLoading && <span className="me-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ─── Badge ────────────────────────────────────────────────────────────────────

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'warning';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  const variants = {
    default:     'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900',
    secondary:   'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200',
    success:     'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
    destructive: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    warning:     'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
    outline:     'border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant], className
      )}
      {...props}
    />
  );
};

// ─── Card ────────────────────────────────────────────────────────────────────

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all', className)} {...props} />
);
export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1 p-6', className)} {...props} />
);
export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
);
export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-zinc-500 dark:text-zinc-400', className)} {...props} />
);
export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);
export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center p-6 pt-0 gap-2', className)} {...props} />
);

// ─── Input ────────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helperText, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full space-y-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm transition-all placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-50 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
        {helperText && !error && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full space-y-1.5">
        {label && <label htmlFor={textareaId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm transition-all placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
        {helperText && !error && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// ─── Label ────────────────────────────────────────────────────────────────────

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = ({ className, required, optional, children, ...props }: LabelProps) => (
  <label className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700 dark:text-zinc-300 flex items-center gap-1', className)} {...props}>
    {children}
    {required && <span className="text-red-500 text-xs">*</span>}
    {optional && <span className="text-zinc-400 text-xs font-normal">(optional)</span>}
  </label>
);

// ─── Checkbox ────────────────────────────────────────────────────────────────

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = ({ checked = false, onCheckedChange, label, disabled, className }: CheckboxProps) => (
  <label className={cn('flex items-center gap-2 cursor-pointer select-none group', disabled && 'cursor-not-allowed opacity-50', className)}>
    <button
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'h-4 w-4 rounded border-2 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 shrink-0',
        checked
          ? 'bg-zinc-900 border-zinc-900 dark:bg-zinc-50 dark:border-zinc-50'
          : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-950 group-hover:border-zinc-500'
      )}
    >
      {checked && <Check size={10} strokeWidth={3} className="text-white dark:text-zinc-900" />}
    </button>
    {label && <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>}
  </label>
);

// ─── Switch ──────────────────────────────────────────────────────────────────

export const Switch = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none group">
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',
        checked ? 'bg-zinc-900 dark:bg-zinc-50' : 'bg-zinc-200 dark:bg-zinc-800'
      )}
    >
      <span className={cn('inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-950 transition-transform duration-200 shadow-sm', checked ? 'translate-x-6' : 'translate-x-1')} />
    </button>
    {label && <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>}
  </label>
);

// ─── Select ──────────────────────────────────────────────────────────────────

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = ({ value, onValueChange, options, placeholder = 'Select…', label, disabled, className }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <div className={cn('w-full space-y-1.5', className)} ref={ref}>
      {label && <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
      <div className="relative">
        <button
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50 dark:focus-visible:ring-zinc-50 disabled:cursor-not-allowed disabled:opacity-50',
            open && 'ring-2 ring-zinc-900 dark:ring-zinc-50'
          )}
        >
          <span className={selected ? '' : 'text-zinc-400 dark:text-zinc-500'}>{selected?.label ?? placeholder}</span>
          <ChevronDown size={16} className={cn('text-zinc-400 transition-transform duration-200', open && 'rotate-180')} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              {options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => { onValueChange?.(opt.value); setOpen(false); }}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors',
                    opt.value === value && 'font-semibold text-zinc-900 dark:text-zinc-50'
                  )}
                >
                  <span className="w-4">{opt.value === value && <Check size={14} strokeWidth={3} />}</span>
                  {opt.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Tabs ────────────────────────────────────────────────────────────────────

interface TabsContextValue { active: string; setActive: (v: string) => void; }
const TabsContext = createContext<TabsContextValue>({ active: '', setActive: () => {} });

export const Tabs = ({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) => {
  const [active, setActive] = useState(defaultValue);
  return <TabsContext.Provider value={{ active, setActive }}><div className={cn('', className)}>{children}</div></TabsContext.Provider>;
};

export const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('inline-flex h-10 items-center justify-center rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900', className)}>{children}</div>
);

export const TabsTrigger = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      onClick={() => setActive(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50',
        isActive ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-50' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50',
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div className={cn('mt-4 focus-visible:outline-none', className)}>{children}</div>;
};

// ─── Alert ───────────────────────────────────────────────────────────────────

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
  title?: string;
}

export const Alert = ({ className, variant = 'default', title, children, ...props }: AlertProps) => {
  const styles = {
    default:     { wrap: 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900', icon: <Info size={16} className="text-zinc-500" /> },
    info:        { wrap: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40', icon: <Info size={16} className="text-blue-600 dark:text-blue-400" /> },
    success:     { wrap: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/40', icon: <CheckCircle size={16} className="text-green-600 dark:text-green-400" /> },
    warning:     { wrap: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/40', icon: <AlertTriangle size={16} className="text-yellow-600 dark:text-yellow-400" /> },
    destructive: { wrap: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40', icon: <AlertCircle size={16} className="text-red-600 dark:text-red-400" /> },
  };
  const { wrap, icon } = styles[variant];
  return (
    <div className={cn('relative w-full rounded-lg border p-4', wrap, className)} {...props}>
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          {title && <h5 className="mb-1 font-semibold text-sm leading-none tracking-tight">{title}</h5>}
          <div className="text-sm text-zinc-600 dark:text-zinc-400 [&_p]:leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

// ─── Avatar ──────────────────────────────────────────────────────────────────

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar = ({ src, alt, fallback, size = 'md', className }: AvatarProps) => {
  const [error, setError] = useState(false);
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg' };
  return (
    <span className={cn('relative flex shrink-0 overflow-hidden rounded-full', sizes[size], className)}>
      {src && !error
        ? <img src={src} alt={alt} onError={() => setError(true)} className="aspect-square h-full w-full object-cover" />
        : <span className="flex h-full w-full items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300 uppercase">{fallback?.slice(0, 2) ?? '?'}</span>
      }
    </span>
  );
};

// ─── Progress ────────────────────────────────────────────────────────────────

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  indicatorClassName?: string;
}

export const Progress = ({
  value = 0,
  max = 100,
  label,
  showValue,
  className,
  indicatorClassName,
}: ProgressProps) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>}
          {showValue && <span className="text-xs text-zinc-500 dark:text-zinc-400">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className={cn('h-full rounded-full bg-zinc-900 dark:bg-zinc-50 transition-all duration-500', indicatorClassName)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// ─── Separator ───────────────────────────────────────────────────────────────

export const Separator = ({ className, orientation = 'horizontal' }: { className?: string; orientation?: 'horizontal' | 'vertical' }) => (
  <div
    role="separator"
    className={cn(
      'shrink-0 bg-zinc-200 dark:bg-zinc-800',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
  />
);

// ─── Skeleton ────────────────────────────────────────────────────────────────

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800', className)} {...props} />
);

// ─── Accordion ───────────────────────────────────────────────────────────────

interface AccordionItem { value: string; trigger: string; content: React.ReactNode; }

export const Accordion = ({ items, className }: { items: AccordionItem[]; className?: string }) => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className={cn('divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden', className)}>
      {items.map((item) => {
        const isOpen = open === item.value;
        return (
          <div key={item.value}>
            <button
              onClick={() => setOpen(isOpen ? null : item.value)}
              className="flex w-full items-center justify-between px-4 py-4 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-start"
            >
              {item.trigger}
              <ChevronRight size={16} className={cn('text-zinc-400 transition-transform duration-200 shrink-0', isOpen && 'rotate-90')} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm text-zinc-600 dark:text-zinc-400">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// ─── Modal / Dialog ──────────────────────────────────────────────────────────

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, description, children, footer }: ModalProps) => {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="space-y-1 pe-6">
                {title && <h3 className="text-lg font-semibold leading-none">{title}</h3>}
                {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8 shrink-0 -mt-1 -me-2">
                <X size={16} />
              </Button>
            </div>
            <div className="px-6 pb-4">{children}</div>
            {footer && <div className="flex items-center justify-end gap-2 border-t border-zinc-100 dark:border-zinc-900 px-6 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export const Tooltip = ({ content, children, side = 'top' }: { content: string; children: React.ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' }) => {
  const [visible, setVisible] = useState(false);
  const positions = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 me-2',
    right:  'left-full top-1/2 -translate-y-1/2 ms-2',
  };
  return (
    <div className="relative inline-flex" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={cn('absolute z-50 w-max max-w-xs rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-50 shadow-md dark:bg-zinc-50 dark:text-zinc-900 pointer-events-none', positions[side])}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Avatar Group ────────────────────────────────────────────────────────────

export const AvatarGroup = ({ avatars, max = 4 }: { avatars: AvatarProps[]; max?: number }) => {
  const visible = avatars.slice(0, max);
  const rest = avatars.length - max;
  return (
    <div className="flex -space-x-2">
      {visible.map((a, i) => (
        <Avatar key={i} {...a} className={cn('ring-2 ring-white dark:ring-zinc-950', a.className)} />
      ))}
      {rest > 0 && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-semibold ring-2 ring-white dark:ring-zinc-950">
          +{rest}
        </span>
      )}
    </div>
  );
};
