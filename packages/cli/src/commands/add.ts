import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const SUPPORTED_COMPONENTS = ['button', 'input', 'modal', 'card', 'table', 'dashboard'];

const COMPONENT_TEMPLATES: Record<string, string> = {
  button: `import React from 'react';
import { Button } from '@keter-ui/react';

export function MyButton() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}
`,

  input: `import React, { useState } from 'react';
import { Input } from '@keter-ui/react';

export function MyInput() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4 max-w-sm">
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="We'll never share your email."
      />
      <Input
        label="Password"
        type="password"
        error="Password must be at least 8 characters."
      />
    </div>
  );
}
`,

  modal: `import React from 'react';
import { Modal, Button } from '@keter-ui/react';
import { useToggle } from '@keter-ui/core';

export function MyModal() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button onClick={toggle}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={toggle}
        title="Confirm Action"
        footer={
          <>
            <Button variant="ghost" onClick={toggle}>Cancel</Button>
            <Button variant="primary" onClick={toggle}>Confirm</Button>
          </>
        }
      >
        <p>Are you sure you want to perform this action? This cannot be undone.</p>
      </Modal>
    </>
  );
}
`,

  card: `import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@keter-ui/react';

export function MyCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader title="Card Title" subtitle="Supporting text goes here" />
      <CardBody>
        <p className="text-secondary-600 text-sm">
          This is the card body content. You can put any content here.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">Action</Button>
      </CardFooter>
    </Card>
  );
}
`,

  table: `import React from 'react';
import { Table } from '@keter-ui/react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns = [
  { key: 'id' as const, header: 'ID', sortable: true },
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'email' as const, header: 'Email' },
  { key: 'role' as const, header: 'Role', sortable: true },
  { key: 'status' as const, header: 'Status' },
];

const data: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
];

export function MyTable() {
  return <Table columns={columns} data={data} />;
}
`,

  dashboard: `'use client'; // remove this line if not using Next.js

import React, { useState } from 'react';
import {
  DashboardLayout,
  Sidebar,
  Topbar,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from '@keter-ui/react';
import { useToggle } from '@keter-ui/core';
import { useRTL } from '@keter-ui/rtl';

const metrics = [
  { label: 'Total Revenue', value: '$48,295', change: '+12.5%', positive: true },
  { label: 'Active Users', value: '3,842', change: '+8.1%', positive: true },
  { label: 'New Orders', value: '284', change: '-2.3%', positive: false },
  { label: 'Conversion', value: '3.24%', change: '+0.4%', positive: true },
];

const activityFeed = [
  { user: 'Alice', action: 'Created a new project', time: '2m ago' },
  { user: 'Bob', action: 'Updated user settings', time: '15m ago' },
  { user: 'Carol', action: 'Published a report', time: '1h ago' },
  { user: 'Dave', action: 'Deleted old records', time: '3h ago' },
];

const tableColumns = [
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'status' as const, header: 'Status', sortable: true },
  { key: 'revenue' as const, header: 'Revenue', sortable: true },
  { key: 'date' as const, header: 'Date' },
];

const tableData = [
  { name: 'Project Alpha', status: 'Active', revenue: '$12,400', date: '2026-01-15' },
  { name: 'Project Beta', status: 'Pending', revenue: '$8,200', date: '2026-02-03' },
  { name: 'Project Gamma', status: 'Completed', revenue: '$22,100', date: '2026-03-20' },
];

const navItems = [
  { label: 'Dashboard', icon: '⊞', active: true },
  { label: 'Analytics', icon: '↗', active: false },
  { label: 'Users', icon: '👤', active: false },
  { label: 'Projects', icon: '📁', active: false },
  { label: 'Settings', icon: '⚙', active: false },
];

export function MyDashboard() {
  const [collapsed, toggleCollapsed] = useToggle(false);
  const { isRTL, toggleDirection } = useRTL();

  return (
    <DashboardLayout
      sidebar={
        <Sidebar collapsed={collapsed}>
          <div className="flex items-center justify-between p-4 border-b border-secondary-100">
            {!collapsed && (
              <span className="text-lg font-bold text-primary-600">Keter UI</span>
            )}
            <button
              onClick={toggleCollapsed}
              className="p-1.5 rounded-md hover:bg-secondary-100 text-secondary-500"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={\`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors \${
                  item.active
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-700'
                }\`}
              >
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-secondary-100">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                KU
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-medium text-secondary-700 truncate">Keter User</p>
                  <p className="text-xs text-secondary-400 truncate">user@keter.dev</p>
                </div>
              )}
            </div>
          </div>
        </Sidebar>
      }
      topbar={
        <Topbar>
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-lg font-semibold text-secondary-800">Dashboard</h1>
            <div className="flex items-center gap-3 ms-auto">
              <input
                placeholder="Search..."
                className="h-9 px-3 rounded-md border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-48"
              />
              <Button size="sm" variant="ghost" onClick={toggleDirection}>
                {isRTL ? 'LTR' : 'RTL'}
              </Button>
              <button className="p-2 rounded-md hover:bg-secondary-100 relative">
                <span>🔔</span>
                <span className="absolute top-1 end-1 h-2 w-2 rounded-full bg-danger-500" />
              </button>
            </div>
          </div>
        </Topbar>
      }
    >
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardBody>
              <p className="text-sm text-secondary-500 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-secondary-800">{metric.value}</p>
              <p
                className={\`text-xs font-medium mt-1 \${
                  metric.positive ? 'text-success-600' : 'text-danger-500'
                }\`}
              >
                {metric.change}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue Overview" subtitle="Last 30 days" />
          <CardBody>
            <div className="h-48 flex items-end justify-between gap-1 px-2">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary-500/20 hover:bg-primary-500/40 rounded-t transition-colors"
                  style={{ height: \`\${h}%\` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-secondary-400 mt-2 px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
              <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
              <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </CardBody>
        </Card>

        {/* Activity feed */}
        <Card>
          <CardHeader title="Recent Activity" />
          <CardBody>
            <div className="space-y-4">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-bold shrink-0">
                    {item.user[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-secondary-700">
                      <span className="font-medium">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-secondary-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader title="Projects" subtitle="All active and recent projects" />
        <CardBody>
          <Table columns={tableColumns} data={tableData} />
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
`,
};

function detectComponentDir(cwd: string): string {
  const candidates = [
    path.join(cwd, 'components'),
    path.join(cwd, 'src', 'components'),
    path.join(cwd, 'app', 'components'),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return path.join(cwd, 'components');
}

export async function add(component: string) {
  const cwd = process.cwd();
  const name = component.toLowerCase();

  console.log('');

  if (!SUPPORTED_COMPONENTS.includes(name)) {
    console.log(chalk.red(`  ✗ Unknown component: ${component}`));
    console.log('');
    console.log(chalk.gray('  Available components:'));
    SUPPORTED_COMPONENTS.forEach((c) => console.log(chalk.gray(`    • ${c}`)));
    console.log('');
    process.exit(1);
  }

  console.log(chalk.bold.blue(`  Keter UI — Adding ${component}`));
  console.log('');

  const componentDir = detectComponentDir(cwd);
  const fileName = name === 'dashboard' ? `${name}.tsx` : `${name}.example.tsx`;
  const outputPath = path.join(componentDir, fileName);

  if (fs.existsSync(outputPath)) {
    console.log(chalk.yellow(`  ⚠ ${fileName} already exists. Skipping.`));
    console.log('');
    return;
  }

  await fs.outputFile(outputPath, COMPONENT_TEMPLATES[name]);

  console.log(chalk.green(`  ✓ Created ${path.relative(cwd, outputPath)}`));
  console.log('');
  console.log(chalk.gray('  Usage:'));
  console.log(
    chalk.gray(
      `    import { My${component.charAt(0).toUpperCase() + component.slice(1)} } from '${path
        .relative(cwd, outputPath)
        .replace(/\\/g, '/')
        .replace('.tsx', '')}';`
    )
  );
  console.log('');
}
