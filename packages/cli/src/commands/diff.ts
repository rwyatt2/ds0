import chalk from 'chalk';
import { createTwoFilesPatch } from 'diff';
import { join } from 'path';
import { readdirSync } from 'fs';

import { logger } from '../utils/logger';
import { readConfig, configExists } from '../utils/config';
import { getRegistry, getComponent } from '../utils/registry';
import { fileExists, readFile } from '../utils/file-ops';

interface DiffOptions {
    cwd: string;
}

export async function diffCommand(options: DiffOptions): Promise<void> {
    const cwd = options.cwd;

    if (!configExists(cwd)) {
        logger.error('DS0 is not initialized. Run `ds0 init` first.');
        return;
    }

    const config = readConfig(cwd);
    const componentsDir = join(cwd, config.componentsDir);

    // Get list of installed components
    let installedDirs: string[];
    try {
        installedDirs = readdirSync(componentsDir, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);
    } catch {
        logger.info('No DS0 components found in your project.');
        return;
    }

    if (installedDirs.length === 0) {
        logger.info('No DS0 components found in your project.');
        return;
    }

    logger.header();
    logger.info(`Comparing ${installedDirs.length} component(s) with registry...\n`);

    const registry = await getRegistry(config.registryUrl);

    let hasChanges = false;

    for (const dirName of installedDirs) {
        const component = getComponent(registry, dirName);
        if (!component) {
            logger.warn(`${dirName} — not found in registry (custom component?)`);
            continue;
        }

        for (const file of component.files) {
            const localPath = join(componentsDir, dirName, file.path.split('/').pop()!);

            if (!fileExists(localPath)) {
                console.log(chalk.yellow(`  + ${dirName}/${file.path.split('/').pop()} — missing locally (new upstream file)`));
                hasChanges = true;
                continue;
            }

            const localContent = readFile(localPath);
            const registryContent = file.content;

            // Normalize import paths for comparison
            const normalizedLocal = localContent.replace(/@\/[^\s'"]+\/utils/g, '@/lib/utils');
            const normalizedRegistry = registryContent.replace(/@\/lib\/utils/g, '@/lib/utils');

            if (normalizedLocal !== normalizedRegistry) {
                hasChanges = true;
                console.log(chalk.yellow(`  ~ ${dirName}/${file.path.split('/').pop()} — modified`));

                const patch = createTwoFilesPatch(
                    `registry/${file.path}`,
                    `local/${dirName}/${file.path.split('/').pop()}`,
                    normalizedRegistry,
                    normalizedLocal,
                    'upstream',
                    'local'
                );

                // Show first 30 lines of diff
                const lines = patch.split('\n');
                const preview = lines.slice(0, 30);
                for (const line of preview) {
                    if (line.startsWith('+') && !line.startsWith('+++')) {
                        console.log(chalk.green(`    ${line}`));
                    } else if (line.startsWith('-') && !line.startsWith('---')) {
                        console.log(chalk.red(`    ${line}`));
                    } else {
                        console.log(chalk.dim(`    ${line}`));
                    }
                }

                if (lines.length > 30) {
                    console.log(chalk.dim(`    ... ${lines.length - 30} more lines`));
                }

                logger.blank();
            }
        }
    }

    if (!hasChanges) {
        logger.success('All components match the registry. No upstream changes.');
    } else {
        logger.blank();
        logger.info('To update a component with upstream changes:');
        logger.step(`${chalk.cyan('npx ds0 add [component] --overwrite')}`);
        logger.warn('This will overwrite your local modifications.');
    }

    logger.blank();
}
