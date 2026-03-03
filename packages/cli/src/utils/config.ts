import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import type { DS0Config } from '../types';

const CONFIG_FILENAME = 'ds0.config.json';

const DEFAULT_CONFIG: DS0Config = {
    componentsDir: 'components/ds0',
    tailwindConfig: 'tailwind.config.ts',
    globalsCss: 'app/globals.css',
    utilsPath: 'lib/utils.ts',
    typescript: true,
    packageManager: 'pnpm',
    registryUrl: 'https://ds0.systems/registry',
};

export function getConfigPath(cwd: string): string {
    return join(cwd, CONFIG_FILENAME);
}

export function configExists(cwd: string): boolean {
    return existsSync(getConfigPath(cwd));
}

export function readConfig(cwd: string): DS0Config {
    const configPath = getConfigPath(cwd);

    if (!existsSync(configPath)) {
        return DEFAULT_CONFIG;
    }

    const content = readFileSync(configPath, 'utf-8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(content) };
}

export function writeConfig(cwd: string, config: Partial<DS0Config>): void {
    const merged = { ...DEFAULT_CONFIG, ...config };
    writeFileSync(
        getConfigPath(cwd),
        JSON.stringify(merged, null, 2) + '\n',
        'utf-8'
    );
}
