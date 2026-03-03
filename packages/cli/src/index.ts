import { Command } from 'commander';

import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { diffCommand } from './commands/diff';
import { doctorCommand } from './commands/doctor';
import { aiContextCommand } from './commands/ai-context';
import { listCommand } from './commands/list';

const program = new Command();

program
    .name('ds0')
    .description('DS0 — The AI-Native Design System')
    .version('0.1.0');

program
    .command('init')
    .description('Initialize DS0 in your project')
    .option('-y, --yes', 'Skip prompts, use defaults')
    .option('-c, --cwd <path>', 'Working directory', process.cwd())
    .action(initCommand);

program
    .command('add [components...]')
    .description('Add components or recipes to your project')
    .option('-y, --yes', 'Skip confirmation')
    .option('-o, --overwrite', 'Overwrite existing files')
    .option('-c, --cwd <path>', 'Working directory', process.cwd())
    .option('-r, --recipe', 'Add a recipe instead of a component')
    .action(addCommand);

program
    .command('diff')
    .description('Show changes between your components and the DS0 registry')
    .option('-c, --cwd <path>', 'Working directory', process.cwd())
    .action(diffCommand);

program
    .command('doctor')
    .description('Validate your DS0 setup')
    .option('-c, --cwd <path>', 'Working directory', process.cwd())
    .action(doctorCommand);

program
    .command('ai-context')
    .description('Export AI context pack for your project')
    .option('-o, --output <path>', 'Output directory', 'ds0-ai-context')
    .option('-c, --cwd <path>', 'Working directory', process.cwd())
    .action(aiContextCommand);

program
    .command('list')
    .description('List all available components and recipes')
    .option('--components', 'List only components')
    .option('--recipes', 'List only recipes')
    .option('--json', 'Output as JSON')
    .action(listCommand);

program.parse();
