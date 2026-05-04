import { useAppContext } from '../../context/AppContext';
import { Card, Button, Input } from '../ui/KeterUI';
import { Copy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComponentsGrid = () => {
  const { t } = useAppContext();

  const components = [
    { name: 'Button', preview: <Button>Click me</Button>, code: '<Button>Click me</Button>' },
    { name: 'Input', preview: <Input placeholder="Type here..." />, code: '<Input placeholder="..." />' },
    { name: 'Card', preview: <div className="h-20 w-32 border rounded-lg bg-zinc-50 dark:bg-zinc-900" />, code: '<Card>Content</Card>' },
    { name: 'Switch', preview: <div className="w-10 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 relative"><div className="h-4 w-4 bg-white rounded-full absolute top-1 right-1" /></div>, code: '<Switch />' },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
             Essential Components
          </h2>
          <p className="mt-4 text-zinc-500">A preview of our building blocks.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {components.map((comp) => (
              <Card key={comp.name} className="group flex flex-col justify-between border-zinc-200 dark:border-zinc-800">
                 <div className="flex-1 flex items-center justify-center min-h-[140px] mb-4">
                    {comp.preview}
                 </div>
                 <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900">
                    <span className="text-sm font-medium">{comp.name}</span>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                       <Copy size={14} />
                    </Button>
                 </div>
              </Card>
           ))}
        </div>

        <div className="mt-12 text-center">
           <Link to="/components">
              <Button variant="outline" className="gap-2">
                 Explore Full Library <ChevronRight size={18} />
              </Button>
           </Link>
        </div>
      </div>
    </section>
  );
};
