import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button, Card, Input, Modal, Switch } from '../components/ui/KeterUI';
import { cn } from '../lib/utils';
import { 
  Box, 
  Type, 
  Square, 
  ToggleLeft, 
  Layout, 
  ChevronRight,
  Code2,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const components = [
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component with multiple variants and sizes.',
    icon: <Square size={18} />,
    preview: (
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    ),
    code: `<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>`
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Form input field with support for labels, errors, and helper text.',
    icon: <Type size={18} />,
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <Input label="Email Address" placeholder="douglas@keter.ui" helperText="Enter your workplace email." />
        <Input label="Password" type="password" error="This field is required." defaultValue="password" />
      </div>
    ),
    code: `<Input 
  label="Email" 
  placeholder="hello@example.com" 
  helperText="Helper message" 
/>`
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Clean container for grouping related content and information.',
    icon: <Box size={18} />,
    preview: (
      <Card className="max-w-xs">
        <h4 className="font-bold mb-2">Project Keter</h4>
        <p className="text-sm text-zinc-500 mb-4">A high-performance UI library for modern web applications.</p>
        <Button variant="secondary" size="sm" className="w-full">View Details</Button>
      </Card>
    ),
    code: `<Card>
  <h4>Title</h4>
  <p>Description</p>
</Card>`
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'A toggle control for switching between two boolean states.',
    icon: <ToggleLeft size={18} />,
    preview: (
      <div className="flex items-center gap-4">
        <Switch checked={true} onChange={() => {}} />
        <span className="text-sm font-medium">Automatic Updates</span>
      </div>
    ),
    code: `<Switch checked={true} onChange={handleToggle} />`
  },
  {
    id: 'modal',
    name: 'Modal',
    description: 'A dialog box/popup window that is displayed on top of the current page.',
    icon: <Layout size={18} />,
    preview: (
      <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-xl max-w-sm">
         <h4 className="font-bold mb-2">Delete Confirmation</h4>
         <p className="text-sm text-zinc-500 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
         <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="danger" size="sm">Delete</Button>
         </div>
      </div>
    ),
    code: `<Modal isOpen={true} onClose={close}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
</Modal>`
  }
];

export const ComponentsPage = () => {
  const [selected, setSelected] = useState(components[0]);
  const [view, setView] = useState<'preview' | 'code'>('preview');

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          
          {/* Sidebar Nav */}
          <aside className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 px-2">Components</h4>
              <nav className="space-y-1">
                {components.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelected(item); setView('preview'); }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-all group",
                      selected.id === item.id 
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg shadow-zinc-900/10" 
                        : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                       <span className={cn(selected.id === item.id ? "text-inherit" : "text-zinc-400 group-hover:text-zinc-900 transition-colors")}>{item.icon}</span>
                       {item.name}
                    </div>
                    {selected.id === item.id && <ChevronRight size={14} />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            <header className="mb-10">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2">
                  <Box size={12} />
                  Components
               </div>
               <h1 className="text-4xl font-black tracking-tight mb-4">{selected.name}</h1>
               <p className="text-lg text-zinc-500 max-w-2xl">{selected.description}</p>
            </header>

            <div className="space-y-8">
              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                 <div className="flex gap-8">
                    <button 
                      onClick={() => setView('preview')}
                      className={cn(
                        "pb-3 text-xs font-black uppercase tracking-widest transition-all relative",
                        view === 'preview' ? "text-zinc-950 dark:text-white" : "text-zinc-400 hover:text-zinc-600"
                      )}
                    >
                       Preview
                       {view === 'preview' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-white" />}
                    </button>
                    <button 
                      onClick={() => setView('code')}
                      className={cn(
                        "pb-3 text-xs font-black uppercase tracking-widest transition-all relative",
                        view === 'code' ? "text-zinc-950 dark:text-white" : "text-zinc-400 hover:text-zinc-600"
                      )}
                    >
                       Code
                       {view === 'code' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-white" />}
                    </button>
                 </div>
              </div>

              {/* Display Area */}
              <Card className="min-h-[400px] flex items-center justify-center p-8 bg-zinc-50/50 dark:bg-zinc-950 relative overflow-hidden border-zinc-200 dark:border-zinc-800">
                 <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                 
                 <AnimatePresence mode="wait">
                    {view === 'preview' ? (
                       <motion.div
                         key="preview"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="w-full flex justify-center"
                       >
                          {selected.preview}
                       </motion.div>
                    ) : (
                       <motion.div
                         key="code"
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.98 }}
                         className="w-full max-w-2xl"
                       >
                          <div className="bg-zinc-950 rounded-xl p-6 font-mono text-xs text-blue-300 shadow-2xl relative group">
                             <pre><code>{selected.code}</code></pre>
                             <button className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Code2 size={16} />
                             </button>
                          </div>
                       </motion.div>
                    ) }
                 </AnimatePresence>
              </Card>

              {/* Usage Info */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                 <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest">Installation</h3>
                    <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-[10px]">
                       npm install @keter-ui/{selected.id}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest">Properties</h3>
                    <p className="text-xs text-zinc-500 font-medium">This component supports all standard HTML attributes and our custom theme tokens.</p>
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
