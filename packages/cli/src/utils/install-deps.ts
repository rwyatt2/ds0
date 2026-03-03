import { execSync } from 'child_process';

import type { PackageManager } from './detect-package-manager';
import { getInstallCommand } from './detect-package-manager';

export function installDependencies(
    cwd: string,
    pm: PackageManager,
    deps: string[],
    isDev = false
): void {
    if (deps.length === 0) return;

    const cmd = getInstallCommand(pm, deps, isDev);

    execSync(cmd, {
        cwd,
        stdio: 'pipe',
    });
}
