import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  Button, Card, Input, Modal, Switch, Badge, Checkbox, Alert, Avatar,
  Progress, Skeleton, Separator, Tabs, TabsList, TabsTrigger, TabsContent,
  Select, Accordion, Tooltip, Textarea, Label
} from '../components/ui/KeterUI';
import { cn } from '../lib/utils';
import {
  Square, Type, Box, ToggleLeft, Layout, ChevronRight, Code2,
  Tag, CheckSquare, Bell, User, BarChart2, Minus, List, AlignJustify,
  Info, MousePointer, Rows, SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ComponentPreview = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex items-center justify-center flex-wrap gap-4 p-4">
    {children}
  </div>
);

const components = [
  {
    id: 'button',
    name: 'Button',
    category: 'Forms',
    description: 'A versatile button with multiple variants, sizes, and loading states.',
    icon: <Square size={16} />,
    preview: (
      <ComponentPreview>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>
    ),
    code: `import { Button } from '@/components/ui';

<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger" size="sm">Delete</Button>
<Button isLoading>Saving...</Button>`,
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Forms',
    description: 'Form input with label, helper text, error state, and full RTL support.',
    icon: <Type size={16} />,
    preview: (
      <ComponentPreview>
        <div className="w-full max-w-sm space-y-4">
          <Input label="Email Address" placeholder="you@example.com" helperText="We'll never share your email." />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="Username" error="Username is already taken." defaultValue="douglas" />
          <Input label="Disabled" placeholder="Cannot edit" disabled />
        </div>
      </ComponentPreview>
    ),
    code: `import { Input } from '@/components/ui';

<Input label="Email" placeholder="you@example.com" helperText="Helper text" />
<Input label="Name" error="This field is required." />`,
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    description: 'Multi-line text input for longer form content.',
    icon: <AlignJustify size={16} />,
    preview: (
      <ComponentPreview>
        <div className="w-full max-w-sm space-y-4">
          <Textarea label="Message" placeholder="Write your message here..." rows={4} />
          <Textarea label="Notes" helperText="Optional additional notes." rows={3} />
        </div>
      </ComponentPreview>
    ),
    code: `import { Textarea } from '@/components/ui';

<Textarea label="Message" placeholder="Write here..." rows={4} />`,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    description: 'Accessible checkbox with label and indeterminate state support.',
    icon: <CheckSquare size={16} />,
    preview: (
      <ComponentPreview>
        <div className="flex flex-col gap-3">
          <Checkbox label="Accept terms and conditions" checked={true} onCheckedChange={() => {}} />
          <Checkbox label="Subscribe to newsletter" checked={false} onCheckedChange={() => {}} />
          <Checkbox label="Disabled option" checked={false} onCheckedChange={() => {}} disabled />
        </div>
      </ComponentPreview>
    ),
    code: `import { Checkbox } from '@/components/ui';

<Checkbox
  label="Accept terms"
  checked={checked}
  onCheckedChange={setChecked}
/>`,
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Forms',
    description: 'Toggle control for binary settings with animated thumb.',
    icon: <ToggleLeft size={16} />,
    preview: (
      <ComponentPreview>
        <div className="flex flex-col gap-4">
          <Switch checked={true} onChange={() => {}} label="Dark mode" />
          <Switch checked={false} onChange={() => {}} label="Notifications" />
          <Switch checked={true} onChange={() => {}} label="Auto-save" />
        </div>
      </ComponentPreview>
    ),
    code: `import { Switch } from '@/components/ui';

<Switch
  checked={isDark}
  onChange={setIsDark}
  label="Dark mode"
/>`,
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Forms',
    description: 'Custom animated dropdown with search and multi-option support.',
    icon: <SlidersHorizontal size={16} />,
    preview: (
      <ComponentPreview>
        <div className="w-full max-w-xs space-y-4">
          <Select
            label="Framework"
            options={[
              { value: 'next', label: 'Next.js' },
              { value: 'vite', label: 'Vite' },
              { value: 'remix', label: 'Remix' },
              { value: 'astro', label: 'Astro' },
            ]}
            placeholder="Select framework..."
          />
        </div>
      </ComponentPreview>
    ),
    code: `import { Select } from '@/components/ui';

<Select
  label="Framework"
  options={[{ value: 'next', label: 'Next.js' }]}
  placeholder="Select..."
/>`,
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Display',
    description: 'Status indicator with semantic color variants.',
    icon: <Tag size={16} />,
    preview: (
      <ComponentPreview>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ComponentPreview>
    ),
    code: `import { Badge } from '@/components/ui';

<Badge variant="success">Active</Badge>
<Badge variant="destructive">Failed</Badge>`,
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'Display',
    description: 'Contextual feedback messages with icon and title support.',
    icon: <Bell size={16} />,
    preview: (
      <ComponentPreview>
        <div className="w-full max-w-lg space-y-3">
          <Alert title="Information">This is an informational message.</Alert>
          <Alert variant="info" title="Update Available">A new version is ready to install.</Alert>
          <Alert variant="success" title="Saved!">Your changes have been saved successfully.</Alert>
          <Alert variant="warning" title="Caution">Review changes before publishing.</Alert>
          <Alert variant="destructive" title="Error">Failed to connect to the server.</Alert>
        </div>
      </ComponentPreview>
    ),
    code: `import { Alert } from '@/components/ui';

<Alert variant="success" title="Done!">
  Changes saved successfully.
</Alert>`,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'Display',
    description: 'User representation with image, fallback initials, and size variants.',
    icon: <User size={16} />,
    preview: (
      <ComponentPreview>
        <div className="flex items-center gap-4">
          <Avatar fallback="DY" size="sm" />
          <Avatar fallback="KU" size="md" />
          <Avatar fallback="AI" size="lg" />
          <Avatar fallback="XL" size="xl" />
        </div>
      </ComponentPreview>
    ),
    code: `import { Avatar } from '@/components/ui';

<Avatar src="/photo.jpg" fallback="DY" size="md" />`,
  },
  {
    id: 'progress',
    name: 'Progress',
    category: 'Display',
    description: 'Accessible progress bar with optional label and percentage display.',
    icon: <BarChart2 size={16} />,
    preview: (
      <ComponentPreview>
        <div className="w-full max-w-sm space-y-4">
          <Progress value={25} label="Storage" />
          <Progress value={60} label="Bandwidth" />
          <Progress value={90} label="CPU Usage" />
        </div>
      </ComponentPreview>
    ),
    code: `import { Progress } from '@/components/ui';

<Progress value={72} max={100} label="Upload" />`,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Display',
    description: 'Animated placeholder for content that is still loading.',
    icon: <Rows size={16} />,
    preview: (
      <ComponentPreview>
        <div className="w-full max-w-sm space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      </ComponentPreview>
    ),
    code: `import { Skeleton } from '@/components/ui';

<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-32 w-full rounded-xl" />`,
  },
  {
    id: 'separator',
    name: 'Separator',
    category: 'Layout',
    description: 'Horizontal or vertical divider for visual section separation.',
    icon: <Minus size={16} />,
    preview: (
      <ComponentPreview>
        <div className="w-full max-w-sm space-y-3">
          <p className="text-sm font-semibold">Section A</p>
          <Separator />
          <p className="text-sm font-semibold">Section B</p>
          <Separator />
          <div className="flex items-center gap-4 h-8">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Right</span>
          </div>
        </div>
      </ComponentPreview>
    ),
    code: `import { Separator } from '@/components/ui';

<Separator />
<Separator orientation="vertical" />`,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabbed interface for switching between related content sections.',
    icon: <List size={16} />,
    preview: (
      <ComponentPreview>
        <Tabs defaultValue="overview" className="w-full max-w-sm">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-zinc-500 pt-4">Overview content goes here.</p>
          </TabsContent>
          <TabsContent value="analytics">
            <p className="text-sm text-zinc-500 pt-4">Analytics charts and data.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-sm text-zinc-500 pt-4">Manage your preferences.</p>
          </TabsContent>
        </Tabs>
      </ComponentPreview>
    ),
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
</Tabs>`,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Navigation',
    description: 'Collapsible content sections with smooth animations.',
    icon: <ChevronRight size={16} />,
    preview: (
      <ComponentPreview>
        <Accordion
          className="w-full max-w-sm"
          items={[
            { value: 'q1', trigger: 'What is Keter UI?', content: 'A production-grade, AI-native, RTL-first UI platform.' },
            { value: 'q2', trigger: 'Is RTL supported?', content: 'Yes — RTL is a first-class feature, not an afterthought.' },
            { value: 'q3', trigger: 'How to install?', content: 'Run: npx keter-ui init in your project directory.' },
          ]}
        />
      </ComponentPreview>
    ),
    code: `import { Accordion } from '@/components/ui';

<Accordion items={[
  { value: 'q1', trigger: 'Question?', content: 'Answer.' },
]} />`,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlay',
    description: 'Contextual popup for additional information on hover.',
    icon: <Info size={16} />,
    preview: (
      <ComponentPreview>
        <div className="flex flex-wrap gap-6 justify-center">
          <Tooltip content="Tooltip on top" side="top">
            <Button variant="outline" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" side="right">
            <Button variant="outline" size="sm">Right</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom">
            <Button variant="outline" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" side="left">
            <Button variant="outline" size="sm">Left</Button>
          </Tooltip>
        </div>
      </ComponentPreview>
    ),
    code: `import { Tooltip } from '@/components/ui';

<Tooltip content="More info" side="top">
  <Button>Hover me</Button>
</Tooltip>`,
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'Overlay',
    description: 'Accessible dialog with animated transitions and backdrop.',
    icon: <Layout size={16} />,
    preview: (
      <ComponentPreview>
        <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-xl max-w-sm w-full">
          <h4 className="font-bold mb-1">Confirm Action</h4>
          <p className="text-sm text-zinc-500 mb-5">Are you sure you want to delete this resource? This cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="danger" size="sm">Delete</Button>
          </div>
        </div>
      </ComponentPreview>
    ),
    code: `import { Modal } from '@/components/ui';

<Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>`,
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Layout',
    description: 'Elevated container for grouping related information.',
    icon: <Box size={16} />,
    preview: (
      <ComponentPreview>
        <Card className="max-w-xs w-full">
          <div className="flex items-center gap-3 mb-3">
            <Avatar fallback="DY" size="sm" />
            <div>
              <p className="text-sm font-semibold">Douglas Yaakov</p>
              <p className="text-xs text-zinc-500">Creator of Keter UI</p>
            </div>
          </div>
          <p className="text-sm text-zinc-500 mb-4">Building production-grade UI systems for the modern web.</p>
          <Button variant="outline" size="sm" className="w-full">View Profile</Button>
        </Card>
      </ComponentPreview>
    ),
    code: `import { Card } from '@/components/ui';

<Card>
  <p>Card content</p>
</Card>`,
  },
  {
    id: 'label',
    name: 'Label',
    category: 'Forms',
    description: 'Accessible form label with required indicator support.',
    icon: <MousePointer size={16} />,
    preview: (
      <ComponentPreview>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Label htmlFor="name">Full Name</Label>
          <Label htmlFor="email" required>Email Address</Label>
          <Label htmlFor="bio" optional>Bio</Label>
        </div>
      </ComponentPreview>
    ),
    code: `import { Label } from '@/components/ui';

<Label htmlFor="email" required>Email</Label>`,
  },
];

const categories = ['All', 'Forms', 'Display', 'Layout', 'Navigation', 'Overlay'];

export const ComponentsPage = () => {
  const [selected, setSelected] = useState(components[0]);
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [activeCategory, setActiveCategory] = useState('All');

  if (!selected) return null;

  const filtered = activeCategory === 'All'
    ? components
    : components.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">

          {/* Sidebar Nav */}
          <aside className="space-y-6">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 px-2">Filter</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'px-3 py-1 text-xs font-semibold rounded-full transition-all',
                      activeCategory === cat
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 px-2">
                Components ({filtered.length})
              </h4>
              <nav className="space-y-1">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelected(item); setView('preview'); }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all group',
                      selected.id === item.id
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg shadow-zinc-900/10'
                        : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(selected.id === item.id ? 'text-inherit' : 'text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors')}>
                        {item.icon}
                      </span>
                      {item.name}
                    </div>
                    <span className={cn(
                      'text-[10px] font-normal px-1.5 py-0.5 rounded',
                      selected.id === item.id
                        ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                    )}>
                      {item.category}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            <header className="mb-8">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2">
                <Box size={12} />
                {selected.category}
              </div>
              <h1 className="text-4xl font-black tracking-tight mb-3">{selected.name}</h1>
              <p className="text-lg text-zinc-500 max-w-2xl">{selected.description}</p>
            </header>

            <div className="space-y-8">
              {/* View Tabs */}
              <div className="flex items-center border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex gap-8">
                  {(['preview', 'code'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setView(tab)}
                      className={cn(
                        'pb-3 text-xs font-black uppercase tracking-widest transition-all relative',
                        view === tab ? 'text-zinc-950 dark:text-white' : 'text-zinc-400 hover:text-zinc-600'
                      )}
                    >
                      {tab === 'preview' ? 'Preview' : 'Code'}
                      {view === tab && (
                        <motion.div layoutId="comp-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Area */}
              <Card className="min-h-[360px] flex items-center justify-center p-8 bg-zinc-50/50 dark:bg-zinc-950 relative overflow-hidden border-zinc-200 dark:border-zinc-800">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <AnimatePresence mode="wait">
                  {view === 'preview' ? (
                    <motion.div
                      key={`preview-${selected.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-full relative z-10"
                    >
                      {selected.preview}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`code-${selected.id}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="w-full max-w-2xl relative z-10"
                    >
                      <div className="bg-zinc-950 rounded-xl p-6 font-mono text-xs text-blue-300 shadow-2xl relative group border border-zinc-800">
                        <pre className="whitespace-pre-wrap"><code>{selected.code}</code></pre>
                        <button
                          onClick={() => navigator.clipboard?.writeText(selected.code)}
                          className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy code"
                        >
                          <Code2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Install + Props */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest">Installation</h3>
                  <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                    npx keter-ui init
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-widest">Import</h3>
                  <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-[11px] text-blue-500">
                    {`import { ${selected.name} } from '@/components/ui';`}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
