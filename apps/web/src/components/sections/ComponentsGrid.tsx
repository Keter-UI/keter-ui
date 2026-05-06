import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Card, Button, Input, Badge, Switch, Checkbox, Alert, Avatar, Progress, Skeleton, Separator } from '../ui/KeterUI';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComponentsGrid = () => {
  const { t } = useAppContext();
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(true);

  const components = [
    {
      name: 'Button',
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
        </div>
      ),
    },
    {
      name: 'Input',
      preview: (
        <div className="w-full max-w-[200px]">
          <Input placeholder="Search..." />
        </div>
      ),
    },
    {
      name: 'Badge',
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Error</Badge>
        </div>
      ),
    },
    {
      name: 'Alert',
      preview: (
        <div className="w-full max-w-[240px]">
          <Alert variant="info" title="Info">Updates available.</Alert>
        </div>
      ),
    },
    {
      name: 'Avatar',
      preview: (
        <div className="flex items-center gap-3">
          <Avatar fallback="DY" size="md" />
          <Avatar fallback="KU" size="md" />
          <Avatar fallback="AI" size="md" />
        </div>
      ),
    },
    {
      name: 'Progress',
      preview: (
        <div className="w-full max-w-[200px] space-y-2">
          <Progress value={72} label="Upload" />
        </div>
      ),
    },
    {
      name: 'Checkbox',
      preview: (
        <div className="flex flex-col gap-2">
          <Checkbox label="Remember me" checked={checked} onCheckedChange={setChecked} />
          <Checkbox label="Send updates" checked={true} onCheckedChange={() => {}} />
        </div>
      ),
    },
    {
      name: 'Switch',
      preview: (
        <div className="flex flex-col gap-2">
          <Switch checked={switched} onChange={setSwitched} label="Dark mode" />
        </div>
      ),
    },
    {
      name: 'Separator',
      preview: (
        <div className="w-full max-w-[200px] space-y-3">
          <p className="text-xs text-zinc-500">Section A</p>
          <Separator />
          <p className="text-xs text-zinc-500">Section B</p>
        </div>
      ),
    },
    {
      name: 'Skeleton',
      preview: (
        <div className="w-full max-w-[200px] space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ),
    },
    {
      name: 'Card',
      preview: (
        <Card className="max-w-[200px] p-4">
          <p className="text-xs font-semibold mb-1">Keter UI</p>
          <p className="text-[11px] text-zinc-500">Production-grade UI system.</p>
        </Card>
      ),
    },
    {
      name: 'Input (Error)',
      preview: (
        <div className="w-full max-w-[200px]">
          <Input placeholder="Email" error="Invalid email address." />
        </div>
      ),
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            30+ Production-Ready Components
          </h2>
          <p className="mt-4 text-zinc-500">Accessible, composable, and RTL-first building blocks.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {components.map((comp) => (
            <Card key={comp.name} className="group flex flex-col justify-between border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
              <div className="flex-1 flex items-center justify-center min-h-[140px] mb-4 p-2">
                {comp.preview}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <span className="text-sm font-semibold">{comp.name}</span>
                <Badge variant="secondary" className="text-[10px]">stable</Badge>
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
