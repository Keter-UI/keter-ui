import pc from 'picocolors';

export const logger = {
  info:    (msg: string) => console.log(pc.blue('  info ') + msg),
  success: (msg: string) => console.log(pc.green('  ✓ ') + msg),
  warn:    (msg: string) => console.log(pc.yellow('  warn ') + msg),
  error:   (msg: string) => console.error(pc.red('  ✗ ') + msg),
  log:     (msg: string) => console.log('  ' + msg),
  break:   () => console.log(''),
};

export function printBanner() {
  console.log('');
  console.log(pc.bold(pc.white('  ██╗  ██╗███████╗████████╗███████╗██████╗')));
  console.log(pc.bold(pc.white('  ██║ ██╔╝██╔════╝╚══██╔══╝██╔════╝██╔══██╗')));
  console.log(pc.bold(pc.white('  █████╔╝ █████╗     ██║   █████╗  ██████╔╝')));
  console.log(pc.bold(pc.white('  ██╔═██╗ ██╔══╝     ██║   ██╔══╝  ██╔══██╗')));
  console.log(pc.bold(pc.white('  ██║  ██╗███████╗   ██║   ███████╗██║  ██║')));
  console.log(pc.bold(pc.white('  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝')));
  console.log('');
  console.log(pc.dim('  AI-first · RTL-first · Production-ready'));
  console.log('');
}
