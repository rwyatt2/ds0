import prompts from 'prompts';
import chalk from 'chalk';
import { join } from 'path';

import { logger } from '../utils/logger';
import { createSpinner } from '../utils/spinner';
import { readConfig, configExists } from '../utils/config';
import { getRegistry, getComponent, getRecipe } from '../utils/registry';
import { installDependencies } from '../utils/install-deps';
import { writeFile, fileExists } from '../utils/file-ops';
import type { RegistryComponent, RegistryRecipe } from '../types';

interface AddOptions {
    yes?: boolean;
    overwrite?: boolean;
    cwd: string;
    recipe?: boolean;
}

export async function addCommand(names: string[], options: AddOptions): Promise<void> {
    const cwd = options.cwd;

    // Check init
    if (!configExists(cwd)) {
        logger.error('DS0 is not initialized. Run `ds0 init` first.');
        return;
    }

    const config = readConfig(cwd);

    // If no names provided, show interactive picker
    if (!names || names.length === 0) {
        const registry = await getRegistry(config.registryUrl);
        const items = options.recipe
            ? Object.entries(registry.recipes).map(([key, val]) => ({
                title: val.name,
                description: val.description,
                value: key,
            }))
            : Object.entries(registry.components).map(([key, val]) => ({
                title: val.name,
                description: val.description,
                value: key,
            }));

        const { selected } = await prompts({
            type: 'multiselect',
            name: 'selected',
            message: `Select ${options.recipe ? 'recipes' : 'components'} to add:`,
            choices: items,
            hint: '- Space to select, Enter to confirm',
        });

        if (!selected || selected.length === 0) {
            logger.info('No items selected.');
            return;
        }

        names = selected;
    }

    // Fetch registry
    const spin = createSpinner('Fetching component registry...');
    spin.start();

    let registry;
    try {
        registry = await getRegistry(config.registryUrl);
        spin.succeed('Registry loaded');
    } catch (err) {
        spin.fail('Failed to fetch registry');
        logger.error(String(err));
        return;
    }

    // Resolve all items + dependencies
    const allItems: Array<{ name: string; item: RegistryComponent | RegistryRecipe; isRecipe: boolean }> = [];
    const allDeps: Set<string> = new Set();
    const allDevDeps: Set<string> = new Set();

    for (const name of names) {
        const item = options.recipe
            ? getRecipe(registry, name)
            : getComponent(registry, name);

        if (!item) {
            logger.error(`${options.recipe ? 'Recipe' : 'Component'} "${name}" not found in registry.`);
            logger.info(`Run ${chalk.cyan('ds0 list')} to see available items.`);
            continue;
        }

        allItems.push({ name, item, isRecipe: !!options.recipe });

        // Add npm dependencies
        item.dependencies.forEach(d => allDeps.add(d));
        item.devDependencies.forEach(d => allDevDeps.add(d));

        // Resolve registry dependencies (other DS0 components this depends on)
        for (const depName of item.registryDependencies) {
            const dep = getComponent(registry, depName);
            if (dep) {
                // Check if already installed
                const depPath = join(cwd, config.componentsDir, depName);
                if (!fileExists(join(depPath, 'index.ts'))) {
                    allItems.push({ name: depName, item: dep, isRecipe: false });
                    dep.dependencies.forEach(d => allDeps.add(d));
                }
            }
        }
    }

    if (allItems.length === 0) return;

    // Deduplicate
    const uniqueItems = allItems.filter(
        (item, index, self) => self.findIndex(t => t.name === item.name) === index
    );

    // Confirm
    if (!options.yes) {
        logger.blank();
        logger.info('The following will be added:');
        logger.blank();

        for (const { name: _name, item, isRecipe } of uniqueItems) {
            console.log(`  ${chalk.bold(item.name)} ${chalk.dim(`(${isRecipe ? 'recipe' : item.category})`)}`);
        }

        if (allDeps.size > 0) {
            logger.blank();
            logger.info('npm dependencies:');
            for (const dep of allDeps) {
                console.log(`  ${chalk.dim(dep)}`);
            }
        }

        logger.blank();

        const { confirm } = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: 'Proceed?',
            initial: true,
        });

        if (!confirm) return;
    }

    // Install npm dependencies
    if (allDeps.size > 0) {
        const spin2 = createSpinner('Installing dependencies...');
        spin2.start();
        try {
            installDependencies(cwd, config.packageManager, [...allDeps]);
            if (allDevDeps.size > 0) {
                installDependencies(cwd, config.packageManager, [...allDevDeps], true);
            }
            spin2.succeed('Dependencies installed');
        } catch (err) {
            spin2.fail('Failed to install dependencies');
            logger.error(String(err));
        }
    }

    // Copy component files
    for (const { name, item, isRecipe } of uniqueItems) {
        const targetDir = isRecipe
            ? join(cwd, config.componentsDir, '..', 'recipes', name)
            : join(cwd, config.componentsDir, name);

        let skipped = false;

        for (const file of item.files) {
            const targetPath = join(targetDir, file.path.split('/').pop()!);

            if (fileExists(targetPath) && !options.overwrite) {
                logger.warn(`${targetPath} already exists — skipped (use --overwrite)`);
                skipped = true;
                continue;
            }

            // Transform imports to use the consumer's utils path
            let content = file.content;
            content = content.replace(
                /@\/lib\/utils/g,
                config.utilsPath.replace(/\.ts$/, '').replace(/^src\//, '@/')
            );

            writeFile(targetPath, content);
        }

        if (!skipped) {
            logger.success(`Added ${chalk.bold(item.name)} → ${targetDir.replace(cwd + '/', '')}`);
        }
    }

    logger.blank();
    logger.success('Done!');
    logger.blank();
}
