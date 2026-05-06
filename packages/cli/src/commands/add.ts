import path from 'path';
import fs from 'fs-extra';
import prompts from 'prompts';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { isTypeScriptProject } from '../utils/detect-framework.js';

const COMPONENTS = [
  'accordion', 'alert', 'avatar', 'badge', 'button',
  'card', 'checkbox', 'drawer', 'dropdown', 'form',
  'input', 'label', 'modal', 'progress', 'select',
  'separator', 'skeleton', 'switch', 'table', 'tabs',
  'textarea', 'tooltip',
];

const TEMPLATES: Record<string, (ext: string) => string> = {
  button: (ext) => `import { Button } from '@keter-ui/react';

export function ${capFirst('button')}Demo() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button isLoading>Loading</Button>
    </div>
  );
}
`,

  input: (ext) => `import { Input } from '@keter-ui/react';

export function ${capFirst('input')}Demo() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Username" error="This username is taken" placeholder="@handle" />
      <Input label="Search" placeholder="Search…" helperText="Press Enter to search" />
    </div>
  );
}
`,

  card: (ext) => `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@keter-ui/react';

export function ${capFirst('card')}Demo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Getting started</CardTitle>
        <CardDescription>Deploy your first component in minutes.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Keter UI components are production-ready, RTL-safe, and fully typed.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Get started</Button>
        <Button variant="ghost" size="sm">Learn more</Button>
      </CardFooter>
    </Card>
  );
}
`,

  form: (ext) => `import { useForm } from 'react-hook-form';
import { Form, FormField, FormLabel, FormControl, FormMessage, Input, Button } from '@keter-ui/react';

interface FormData {
  email: string;
  password: string;
}

export function ${capFirst('form')}Demo() {
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="max-w-sm space-y-4">
      <FormField name="email">
        <FormLabel required>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="you@example.com"
            {...form.register('email', {
              required: 'Email is required',
              pattern: { value: /^[^@]+@[^@]+/, message: 'Invalid email' },
            })}
          />
        </FormControl>
        <FormMessage />
      </FormField>
      <FormField name="password">
        <FormLabel required>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="••••••••"
            {...form.register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })}
          />
        </FormControl>
        <FormMessage />
      </FormField>
      <Button type="submit" className="w-full">Sign in</Button>
    </Form>
  );
}
`,

  modal: (ext) => `import { useState } from 'react';
import { Modal, Button } from '@keter-ui/react';

export function ${capFirst('modal')}Demo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Are you sure you want to delete this item?
        </p>
      </Modal>
    </>
  );
}
`,
};

function capFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTemplate(component: string, ext: string): string {
  const tpl = TEMPLATES[component];
  if (tpl) return tpl(ext);
  return `export { ${capFirst(component)} } from '@keter-ui/react';\n`;
}

export async function runAdd(componentArg: string | undefined, opts: { cwd?: string; dir?: string }) {
  const cwd = opts.cwd ? path.resolve(opts.cwd) : process.cwd();
  const isTS = isTypeScriptProject(cwd);
  const ext = isTS ? 'tsx' : 'jsx';

  let component = componentArg;

  if (!component) {
    const { chosen } = await prompts({
      type: 'select',
      name: 'chosen',
      message: 'Which component would you like to add?',
      choices: COMPONENTS.map((c) => ({ title: capFirst(c), value: c })),
    });
    component = chosen as string;
  }

  if (!component || !COMPONENTS.includes(component)) {
    logger.error(`Unknown component: ${component}`);
    logger.log(`Available: ${COMPONENTS.join(', ')}`);
    return;
  }

  const outputDir = opts.dir
    ? path.resolve(cwd, opts.dir)
    : path.join(cwd, 'src', 'components', 'ui');

  await fs.ensureDir(outputDir);
  const outFile = path.join(outputDir, `${component}.${ext}`);

  if (fs.existsSync(outFile)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `${path.relative(cwd, outFile)} already exists. Overwrite?`,
      initial: false,
    });
    if (!overwrite) {
      logger.warn('Skipped.');
      return;
    }
  }

  const spinner = ora(`Creating ${component}…`).start();
  const code = getTemplate(component, ext);
  await fs.writeFile(outFile, code, 'utf-8');
  spinner.succeed(`Created ${path.relative(cwd, outFile)}`);

  logger.break();
  logger.log(`Import it with:`);
  logger.log(`  import { ${capFirst(component)} } from '@keter-ui/react'`);
  logger.break();
}
