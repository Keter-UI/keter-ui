import { Command } from 'commander';
import { printBanner } from './utils/logger.js';
import { runInit } from './commands/init.js';
import { runAdd } from './commands/add.js';

const program = new Command();

program
  .name('keter-ui')
  .description('CLI for Keter UI — AI-first, RTL-first production UI system')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize Keter UI in the current project')
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .option('--cwd <path>', 'Working directory')
  .action(async (opts) => {
    printBanner();
    await runInit(opts);
  });

program
  .command('add [component]')
  .description('Add a component to your project')
  .option('--cwd <path>', 'Working directory')
  .option('--dir <path>', 'Output directory (relative to cwd)', 'src/components/ui')
  .action(async (component, opts) => {
    printBanner();
    await runAdd(component, opts);
  });

program
  .command('list')
  .description('List all available components')
  .action(() => {
    const components = [
      'accordion', 'alert', 'avatar', 'badge', 'button',
      'card', 'checkbox', 'drawer', 'dropdown', 'form',
      'input', 'label', 'modal', 'progress', 'select',
      'separator', 'skeleton', 'switch', 'table', 'tabs',
      'textarea', 'tooltip',
    ];

    console.log('\n  Available components:\n');
    components.forEach((c) => {
      console.log(`  · ${c}`);
    });
    console.log('');
  });

program.parse(process.argv);
