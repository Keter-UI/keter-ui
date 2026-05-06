import path from 'path';
import fs from 'fs-extra';
import prompts from 'prompts';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { fetchRegistry, copyRegistryFile } from '../utils/registry.js';

export async function runAdd(componentArg: string | undefined, opts: { cwd?: string; dir?: string }) {
  const cwd = opts.cwd ? path.resolve(opts.cwd) : process.cwd();
  
  const registry = await fetchRegistry();
  const componentNames = Object.keys(registry.components);

  let component = componentArg;

  if (!component) {
    const { chosen } = await prompts({
      type: 'select',
      name: 'chosen',
      message: 'Which component would you like to add?',
      choices: componentNames.map((c) => ({ title: c.charAt(0).toUpperCase() + c.slice(1), value: c })),
    });
    component = chosen as string;
  }

  if (!component || !registry.components[component]) {
    logger.error(`Unknown component: ${component}`);
    return;
  }

  const entry = registry.components[component];
  const outputDir = opts.dir
    ? path.resolve(cwd, opts.dir)
    : path.join(cwd, 'src', 'components', 'ui');

  const spinner = ora(`Installing ${component}…`).start();
  try {
    for (const file of entry.files) {
      // In registry/index.json, files are relative to registry root, e.g. "components/ui/button.tsx"
      // We want to put them in the user's components/ui folder, preserving filename but not necessarily full path if they customize it.
      const targetPath = path.join(cwd, 'src', file);
      await copyRegistryFile(file, targetPath);
    }
    spinner.succeed(`Installed ${component}`);

    if (entry.dependencies.length > 0) {
      logger.log(`Dependencies required: ${entry.dependencies.join(', ')}`);
      logger.log(`Run: npm install ${entry.dependencies.join(' ')}`);
    }
  } catch (err) {
    spinner.fail(`Failed to install ${component}`);
    logger.error(String(err));
  }
}
