import chalk from 'chalk';

export const logger = {
    info: (msg: string) => console.log(chalk.blue('ℹ'), msg),
    success: (msg: string) => console.log(chalk.green('✓'), msg),
    warn: (msg: string) => console.log(chalk.yellow('⚠'), msg),
    error: (msg: string) => console.log(chalk.red('✕'), msg),
    step: (msg: string) => console.log(chalk.cyan('→'), msg),
    blank: () => console.log(),

    // Header with DS0 branding
    header: () => {
        console.log();
        console.log(chalk.bold(`  DS${chalk.blue('0')} — The AI-Native Design System`));
        console.log();
    },

    // Table for listing components
    table: (rows: Array<{ name: string; category: string; description: string }>) => {
        const maxName = Math.max(...rows.map(r => r.name.length), 10);
        const maxCat = Math.max(...rows.map(r => r.category.length), 10);

        console.log(
            chalk.dim(
                `  ${'Name'.padEnd(maxName)}  ${'Category'.padEnd(maxCat)}  Description`
            )
        );
        console.log(chalk.dim(`  ${'─'.repeat(maxName)}  ${'─'.repeat(maxCat)}  ${'─'.repeat(40)}`));

        for (const row of rows) {
            console.log(
                `  ${chalk.bold(row.name.padEnd(maxName))}  ${chalk.dim(row.category.padEnd(maxCat))}  ${row.description}`
            );
        }
    },
};
