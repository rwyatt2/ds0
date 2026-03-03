import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export type Framework = 'next' | 'vite' | 'remix' | 'astro' | 'gatsby' | 'cra' | 'unknown';

export function detectFramework(cwd: string): Framework {
    const pkgPath = join(cwd, 'package.json');

    if (!existsSync(pkgPath)) return 'unknown';

    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
    };

    if (allDeps['next']) return 'next';
    if (allDeps['vite'] || allDeps['@vitejs/plugin-react']) return 'vite';
    if (allDeps['@remix-run/react']) return 'remix';
    if (allDeps['astro']) return 'astro';
    if (allDeps['gatsby']) return 'gatsby';
    if (allDeps['react-scripts']) return 'cra';

    return 'unknown';
}

export function getFrameworkDisplayName(framework: Framework): string {
    const names: Record<Framework, string> = {
        next: 'Next.js',
        vite: 'Vite',
        remix: 'Remix',
        astro: 'Astro',
        gatsby: 'Gatsby',
        cra: 'Create React App',
        unknown: 'Unknown',
    };
    return names[framework];
}
