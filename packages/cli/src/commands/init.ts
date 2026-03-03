import prompts from 'prompts';
import chalk from 'chalk';

import { logger } from '../utils/logger';
import { createSpinner } from '../utils/spinner';
import { detectFramework, getFrameworkDisplayName } from '../utils/detect-framework';
import { detectPackageManager } from '../utils/detect-package-manager';
import { installDependencies } from '../utils/install-deps';
import { writeConfig, configExists } from '../utils/config';
import { ensureDir, writeFile, fileExists, readFile } from '../utils/file-ops';
import { resolveGlobalsCss, resolveComponentsDir, resolveUtilsPath } from '../utils/paths';
import type { DS0Config } from '../types';

interface InitOptions {
    yes?: boolean;
    cwd: string;
}

export async function initCommand(options: InitOptions): Promise<void> {
    const cwd = options.cwd;

    logger.header();

    // Check if already initialized
    if (configExists(cwd)) {
        logger.warn('DS0 is already initialized in this project.');
        const { proceed } = await prompts({
            type: 'confirm',
            name: 'proceed',
            message: 'Do you want to re-initialize? This will overwrite your config.',
            initial: false,
        });
        if (!proceed) return;
    }

    // Detect environment
    const framework = detectFramework(cwd);
    const packageManager = detectPackageManager(cwd);

    logger.info(`Framework: ${chalk.bold(getFrameworkDisplayName(framework))}`);
    logger.info(`Package manager: ${chalk.bold(packageManager)}`);
    logger.blank();

    // Resolve defaults
    const defaultComponentsDir = resolveComponentsDir(cwd, framework);
    const defaultGlobalsCss = resolveGlobalsCss(cwd, framework);
    const defaultUtilsPath = resolveUtilsPath(cwd, framework);

    let config: DS0Config;

    if (options.yes) {
        // Use all defaults
        config = {
            componentsDir: defaultComponentsDir,
            tailwindConfig: 'tailwind.config.ts',
            globalsCss: defaultGlobalsCss,
            utilsPath: defaultUtilsPath,
            typescript: true,
            packageManager,
            registryUrl: 'https://ds0.systems/registry',
        };
    } else {
        // Interactive prompts
        const answers = await prompts([
            {
                type: 'text',
                name: 'componentsDir',
                message: 'Where should DS0 components be installed?',
                initial: defaultComponentsDir,
            },
            {
                type: 'text',
                name: 'globalsCss',
                message: 'Where is your global CSS file?',
                initial: defaultGlobalsCss,
            },
            {
                type: 'text',
                name: 'utilsPath',
                message: 'Where should the cn() utility be created?',
                initial: defaultUtilsPath,
            },
            {
                type: 'confirm',
                name: 'typescript',
                message: 'Are you using TypeScript?',
                initial: true,
            },
        ]);

        config = {
            componentsDir: answers.componentsDir,
            tailwindConfig: 'tailwind.config.ts',
            globalsCss: answers.globalsCss,
            utilsPath: answers.utilsPath,
            typescript: answers.typescript,
            packageManager,
            registryUrl: 'https://ds0.systems/registry',
        };
    }

    // --- Step 1: Install dependencies ---
    const spin = createSpinner('Installing dependencies...');
    spin.start();

    try {
        installDependencies(cwd, packageManager, [
            '@ds0/primitives',
            '@ds0/tokens',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
        ]);

        spin.succeed('Dependencies installed');
    } catch (err) {
        spin.fail('Failed to install dependencies');
        logger.error(String(err));
        return;
    }

    // --- Step 2: Write config ---
    const spin2 = createSpinner('Writing configuration...');
    spin2.start();

    writeConfig(cwd, config);

    spin2.succeed('Configuration saved to ds0.config.json');

    // --- Step 3: Create components directory ---
    ensureDir(`${cwd}/${config.componentsDir}`);
    logger.success(`Created ${config.componentsDir}/`);

    // --- Step 4: Create cn() utility ---
    if (!fileExists(`${cwd}/${config.utilsPath}`)) {
        const utilsContent = config.typescript
            ? `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`
            : `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;

        writeFile(`${cwd}/${config.utilsPath}`, utilsContent);
        logger.success(`Created ${config.utilsPath}`);
    } else {
        logger.info(`${config.utilsPath} already exists — skipped`);
    }

    // --- Step 5: Update globals.css ---
    const globalsCssPath = `${cwd}/${config.globalsCss}`;
    if (fileExists(globalsCssPath)) {
        const existing = readFile(globalsCssPath);
        if (!existing.includes('@ds0/tokens')) {
            const updated = `@import '@ds0/tokens/css';\n\n${existing}`;
            writeFile(globalsCssPath, updated);
            logger.success(`Added DS0 token import to ${config.globalsCss}`);
        } else {
            logger.info('Token import already present in globals.css — skipped');
        }
    } else {
        const cssContent = `@import '@ds0/tokens/css';\n\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
        writeFile(globalsCssPath, cssContent);
        logger.success(`Created ${config.globalsCss}`);
    }

    // --- Step 6: Update Tailwind config ---
    const twConfigPath = `${cwd}/${config.tailwindConfig}`;
    if (fileExists(twConfigPath)) {
        const existing = readFile(twConfigPath);
        if (!existing.includes('@ds0/tokens/tailwind')) {
            logger.warn(`Please add the DS0 preset to ${config.tailwindConfig}:`);
            logger.blank();
            console.log(chalk.dim(`  import ds0Preset from '@ds0/tokens/tailwind';`));
            console.log(chalk.dim(`  `));
            console.log(chalk.dim(`  export default {`));
            console.log(chalk.dim(`    presets: [ds0Preset],`));
            console.log(chalk.dim(`    content: [`));
            console.log(chalk.dim(`      './${config.componentsDir}/**/*.{ts,tsx}',`));
            console.log(chalk.dim(`    ],`));
            console.log(chalk.dim(`  };`));
            logger.blank();
        }
    }

    // --- Done ---
    logger.blank();
    logger.success(chalk.bold('DS0 initialized successfully!'));
    logger.blank();
    logger.info('Next steps:');
    logger.step(`Add your first component: ${chalk.cyan('npx ds0 add button')}`);
    logger.step(`Browse all components:    ${chalk.cyan('npx ds0 list')}`);
    logger.step(`Read the docs:            ${chalk.cyan('https://ds0.systems')}`);
    logger.blank();
}
