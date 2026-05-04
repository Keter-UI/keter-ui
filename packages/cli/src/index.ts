import { Command } from 'commander';
import { init } from './commands/init';
import { add } from './commands/add';

const program = new Command();

program
  .name('keter-ui')
  .description('CLI for Keter UI - Production-grade RTL-native UI system')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize Keter UI in your project')
  .action(init);

program
  .command('add <component>')
  .description('Add a component to your project')
  .action(add);

program.parse();
