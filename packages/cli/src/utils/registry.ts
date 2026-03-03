import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import type { Registry, RegistryComponent, RegistryRecipe } from '../types';

// In development, read from the local repo.
// In production (published), fetch from the registry URL.
export async function getRegistry(registryUrl?: string): Promise<Registry> {
    // Try local registry first (for development)
    const localPath = resolveLocalRegistryPath();
    if (localPath && existsSync(localPath)) {
        const content = readFileSync(localPath, 'utf-8');
        return JSON.parse(content);
    }

    // Fetch from remote
    const url = registryUrl ?? 'https://ds0.systems/api/registry';
    const response = await fetch(`${url}/registry.json`);

    if (!response.ok) {
        throw new Error(`Failed to fetch registry: ${response.statusText}`);
    }

    return response.json() as Promise<Registry>;
}

export function getComponent(registry: Registry, name: string): RegistryComponent | undefined {
    return registry.components[name];
}

export function getRecipe(registry: Registry, name: string): RegistryRecipe | undefined {
    return registry.recipes[name];
}

export function getAllComponents(registry: Registry): RegistryComponent[] {
    return Object.values(registry.components);
}

export function getAllRecipes(registry: Registry): RegistryRecipe[] {
    return Object.values(registry.recipes);
}

function resolveLocalRegistryPath(): string | null {
    try {
        // Walk up from the CLI package to find the monorepo root
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const monorepoRoot = join(__dirname, '..', '..', '..');
        const registryPath = join(monorepoRoot, 'registry.json');
        return existsSync(registryPath) ? registryPath : null;
    } catch {
        return null;
    }
}
