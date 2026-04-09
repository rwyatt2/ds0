import chalk from 'chalk';
import { join } from 'path';

import { logger } from '../utils/logger';
import { readConfig, configExists } from '../utils/config';
import { fileExists, readFile } from '../utils/file-ops';
import { detectFramework, getFrameworkDisplayName } from '../utils/detect-framework';
import { detectPackageManager } from '../utils/detect-package-manager';

interface DoctorOptions {
    cwd: string;
}

interface Check {
    name: string;
    status: 'pass' | 'fail' | 'warn';
    message: string;
}

export async function doctorCommand(options: DoctorOptions): Promise<void> {
    const cwd = options.cwd;

    logger.header();
    logger.info('Running diagnostics...\n');

    const checks: Check[] = [];

    // Check 1: Config exists
    if (configExists(cwd)) {
        checks.push({ name: 'DS0 Config', status: 'pass', message: 'ds0.config.json found' });
    } else {
        checks.push({ name: 'DS0 Config', status: 'fail', message: 'ds0.config.json not found. Run `ds0 init`.' });
        // Can't continue without config
        printChecks(checks);
        return;
    }

    const config = readConfig(cwd);

    // Check 2: Framework detection
    const framework = detectFramework(cwd);
    checks.push({
        name: 'Framework',
        status: framework === 'unknown' ? 'warn' : 'pass',
        message: framework === 'unknown'
            ? 'Could not detect framework. DS0 works best with Next.js, Vite, or Remix.'
            : `Detected ${getFrameworkDisplayName(framework)}`,
    });

    // Check 3: Package manager
    const pm = detectPackageManager(cwd);
    checks.push({ name: 'Package Manager', status: 'pass', message: `Using ${pm}` });

    // Check 4: Dependencies installed
    const pkgPath = join(cwd, 'package.json');
    if (fileExists(pkgPath)) {
        const pkg = JSON.parse(readFile(pkgPath));
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

        const requiredDeps = ['@ds0/primitives', '@ds0/tokens', 'clsx', 'tailwind-merge', 'class-variance-authority'];
        const missingDeps = requiredDeps.filter(d => !allDeps[d]);

        if (missingDeps.length === 0) {
            checks.push({ name: 'Dependencies', status: 'pass', message: 'All required dependencies installed' });
        } else {
            checks.push({
                name: 'Dependencies',
                status: 'fail',
                message: `Missing: ${missingDeps.join(', ')}. Run \`ds0 init\` to install.`,
            });
        }

        // Check: Tailwind installed
        if (allDeps['tailwindcss']) {
            checks.push({ name: 'Tailwind CSS', status: 'pass', message: 'Installed' });
        } else {
            checks.push({ name: 'Tailwind CSS', status: 'fail', message: 'Not installed. DS0 requires Tailwind CSS.' });
        }
    }

    // Check 5: Utils file exists
    if (fileExists(join(cwd, config.utilsPath))) {
        const content = readFile(join(cwd, config.utilsPath));
        if (content.includes('twMerge') && content.includes('clsx')) {
            checks.push({ name: 'cn() Utility', status: 'pass', message: `Found at ${config.utilsPath}` });
        } else {
            checks.push({ name: 'cn() Utility', status: 'warn', message: `File exists at ${config.utilsPath} but doesn't contain expected cn() function` });
        }
    } else {
        checks.push({ name: 'cn() Utility', status: 'fail', message: `Not found at ${config.utilsPath}` });
    }

    // Check 6: Components directory exists
    if (fileExists(join(cwd, config.componentsDir))) {
        checks.push({ name: 'Components Dir', status: 'pass', message: `Found at ${config.componentsDir}` });
    } else {
        checks.push({ name: 'Components Dir', status: 'warn', message: `${config.componentsDir} doesn't exist yet. It will be created when you add your first component.` });
    }

    // Check 7: Token CSS imported
    if (fileExists(join(cwd, config.globalsCss))) {
        const css = readFile(join(cwd, config.globalsCss));
        if (css.includes('@ds0/tokens')) {
            checks.push({ name: 'Token Import', status: 'pass', message: `Found in ${config.globalsCss}` });
        } else {
            checks.push({ name: 'Token Import', status: 'fail', message: `@ds0/tokens/css not imported in ${config.globalsCss}` });
        }
    } else {
        checks.push({ name: 'Token Import', status: 'fail', message: `${config.globalsCss} not found` });
    }

    // Check 8: Tailwind config has preset
    if (fileExists(join(cwd, config.tailwindConfig))) {
        const twContent = readFile(join(cwd, config.tailwindConfig));
        if (twContent.includes('@ds0/tokens/tailwind') || twContent.includes('ds0Preset')) {
            checks.push({ name: 'Tailwind Preset', status: 'pass', message: 'DS0 preset configured' });
        } else {
            checks.push({ name: 'Tailwind Preset', status: 'warn', message: `DS0 preset not found in ${config.tailwindConfig}. Add: presets: [ds0Preset]` });
        }
    }

    // Check 9: AI manifest validation
    const aiDir = join(cwd, '.ai');
    if (fileExists(aiDir)) {
        const fs = await import('fs');
        const manifestFiles = fs.readdirSync(aiDir).filter((f: string) => f.endsWith('.yaml') || f.endsWith('.yml'));
        if (manifestFiles.length > 0) {
            const invalidManifests: string[] = [];
            for (const file of manifestFiles) {
                try {
                    const content = readFile(join(aiDir, file));
                    // Basic validation: check required fields exist
                    const hasName = content.includes('name:');
                    const hasDescription = content.includes('description:');
                    if (!hasName || !hasDescription) {
                        invalidManifests.push(file);
                    }
                } catch {
                    invalidManifests.push(file);
                }
            }
            if (invalidManifests.length === 0) {
                checks.push({ name: 'AI Manifests', status: 'pass', message: `${manifestFiles.length} manifest(s) valid` });
            } else {
                checks.push({
                    name: 'AI Manifests',
                    status: 'warn',
                    message: `${invalidManifests.length} manifest(s) missing required fields: ${invalidManifests.join(', ')}`,
                });
            }
        } else {
            checks.push({ name: 'AI Manifests', status: 'warn', message: 'No .ai/*.yaml manifests found' });
        }
    }

    printChecks(checks);
}

function printChecks(checks: Check[]): void {
    logger.blank();

    for (const check of checks) {
        const icon = check.status === 'pass'
            ? chalk.green('✓')
            : check.status === 'fail'
                ? chalk.red('✕')
                : chalk.yellow('⚠');

        const message = check.status === 'fail'
            ? chalk.red(check.message)
            : check.status === 'warn'
                ? chalk.yellow(check.message)
                : check.message;

        console.log(`  ${icon}  ${chalk.bold(check.name.padEnd(18))} ${message}`);
    }

    logger.blank();

    const fails = checks.filter(c => c.status === 'fail');
    const warns = checks.filter(c => c.status === 'warn');
    const passes = checks.filter(c => c.status === 'pass');

    if (fails.length === 0 && warns.length === 0) {
        logger.success('All checks passed! DS0 is configured correctly.');
    } else if (fails.length === 0) {
        logger.success(`${passes.length} passed, ${warns.length} warning(s). DS0 should work fine.`);
    } else {
        logger.error(`${fails.length} issue(s) found. Fix them before using DS0.`);
    }

    logger.blank();
}
