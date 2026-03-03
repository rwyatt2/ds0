import { existsSync } from 'fs';
import { join } from 'path';

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export function detectPackageManager(cwd: string): PackageManager {
    if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun';
    if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
    if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
    return 'npm';
}

export function getInstallCommand(pm: PackageManager, deps: string[], isDev = false): string {
    const flag = isDev ? '-D' : '';

    switch (pm) {
        case 'pnpm': return `pnpm add ${flag} ${deps.join(' ')}`;
        case 'yarn': return `yarn add ${flag} ${deps.join(' ')}`;
        case 'bun': return `bun add ${isDev ? '-d' : ''} ${deps.join(' ')}`;
        case 'npm': return `npm install ${isDev ? '--save-dev' : ''} ${deps.join(' ')}`;
    }
}
