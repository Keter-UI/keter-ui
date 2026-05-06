import { Command } from 'commander';
import { printBanner, logger } from './utils/logger.js';
import { runInit } from './commands/init.js';
import { runAdd } from './commands/add.js';
import { fetchRegistry } from './utils/registry.js';

const program = new Command();

program
  .name('keter-ui')
  .description('CLI for Keter UI — AI-first, RTL-first production UI system')
  .version('1.0.12');

program
  .command('init')
  .description('Initialize Keter UI in the current project')
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .option('-c, --cwd <path>', 'Working directory')
  .action(async (opts) => {
    printBanner();
    await runInit(opts);
  });

program
  .command('add')
  .description('Add a component to your project')
  .argument('[component]', 'Component name')
  .option('-c, --cwd <path>', 'Working directory')
  .option('-d, --dir <path>', 'Output directory', 'src/components/ui')
  .action(async (component, opts) => {
    printBanner();
    await runAdd(component, opts);
  });

program
  .command('list')
  .description('List all available components')
  .action(async () => {
    printBanner();
    try {
      const registry = await fetchRegistry();
      logger.log('Available components:');
      Object.keys(registry.components).forEach((c) => {
        logger.log(`  · ${c}`);
      });
    } catch (err) {
      logger.error('Failed to list components.');
    }
  });

program.parse(process.argv);
