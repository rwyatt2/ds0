import chalk from 'chalk';

import { logger } from '../utils/logger';
import { getRegistry, getAllComponents, getAllRecipes } from '../utils/registry';
import { readConfig, configExists } from '../utils/config';

interface ListOptions {
    components?: boolean;
    recipes?: boolean;
    json?: boolean;
    cwd?: string;
}

export async function listCommand(options: ListOptions): Promise<void> {
    const config = configExists(options.cwd ?? process.cwd())
        ? readConfig(options.cwd ?? process.cwd())
        : undefined;

    const registry = await getRegistry(config?.registryUrl);

    if (options.json) {
        console.log(JSON.stringify(registry, null, 2));
        return;
    }

    logger.header();

    if (!options.recipes) {
        const components = getAllComponents(registry);

        console.log(chalk.bold(`  Components (${components.length})`));
        logger.blank();

        // Group by category
        const grouped = new Map<string, typeof components>();
        for (const comp of components) {
            const existing = grouped.get(comp.category) ?? [];
            existing.push(comp);
            grouped.set(comp.category, existing);
        }

        for (const [category, items] of grouped) {
            console.log(chalk.dim(`  ── ${category} ${'─'.repeat(50 - category.length)}`));
            for (const item of items) {
                console.log(
                    `    ${chalk.bold(item.name.padEnd(20))} ${chalk.dim(item.description)}`
                );
            }
            logger.blank();
        }
    }

    if (!options.components) {
        const recipes = getAllRecipes(registry);

        console.log(chalk.bold(`  Recipes (${recipes.length})`));
        logger.blank();

        const grouped = new Map<string, typeof recipes>();
        for (const recipe of recipes) {
            const existing = grouped.get(recipe.category) ?? [];
            existing.push(recipe);
            grouped.set(recipe.category, existing);
        }

        for (const [category, items] of grouped) {
            console.log(chalk.dim(`  ── ${category} ${'─'.repeat(50 - category.length)}`));
            for (const item of items) {
                console.log(
                    `    ${chalk.bold(item.name.padEnd(20))} ${chalk.dim(item.description)}`
                );
            }
            logger.blank();
        }
    }

    logger.info(`Add a component:  ${chalk.cyan('npx ds0 add button')}`);
    logger.info(`Add a recipe:     ${chalk.cyan('npx ds0 add --recipe login-form')}`);
    logger.blank();
}
