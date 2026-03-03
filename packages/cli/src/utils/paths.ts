import { existsSync } from 'fs';
import { join } from 'path';

import type { Framework } from './detect-framework';

/**
 * Resolves where globals.css likely lives based on framework.
 */
export function resolveGlobalsCss(cwd: string, framework: Framework): string {
    switch (framework) {
        case 'next':
            if (existsSync(join(cwd, 'app/globals.css'))) return 'app/globals.css';
            if (existsSync(join(cwd, 'src/app/globals.css'))) return 'src/app/globals.css';
            if (existsSync(join(cwd, 'styles/globals.css'))) return 'styles/globals.css';
            return 'app/globals.css';
        case 'vite':
        case 'remix':
            if (existsSync(join(cwd, 'src/index.css'))) return 'src/index.css';
            return 'src/globals.css';
        default:
            return 'src/globals.css';
    }
}

/**
 * Resolves default components directory based on framework.
 */
export function resolveComponentsDir(cwd: string, framework: Framework): string {
    switch (framework) {
        case 'next':
            if (existsSync(join(cwd, 'src'))) return 'src/components/ds0';
            return 'components/ds0';
        case 'vite':
        case 'remix':
            return 'src/components/ds0';
        default:
            return 'components/ds0';
    }
}

/**
 * Resolves default lib/utils path based on framework.
 */
export function resolveUtilsPath(cwd: string, framework: Framework): string {
    switch (framework) {
        case 'next':
            if (existsSync(join(cwd, 'src'))) return 'src/lib/utils.ts';
            return 'lib/utils.ts';
        default:
            return 'src/lib/utils.ts';
    }
}
