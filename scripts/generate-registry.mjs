/**
 * DS0 Registry Generator
 *
 * Reads component and recipe source files and generates registry.json
 * which the CLI uses to know what's available.
 *
 * Run: node scripts/generate-registry.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const REACT_COMPONENTS_DIR = join(ROOT, 'components/react');
const RECIPES_DIR = join(ROOT, 'recipes');
const MANIFESTS_DIR = join(ROOT, 'packages/ai/manifests');
const PATTERNS_DIR = join(ROOT, 'packages/ai/patterns');
const OUTPUT_PATH = join(ROOT, 'registry.json');

function readManifest(name) {
    const path = join(MANIFESTS_DIR, `${name}.manifest.yaml`);
    if (!existsSync(path)) return null;
    try {
        return yaml.load(readFileSync(path, 'utf-8'));
    } catch {
        console.warn(`  ⚠ Skipping invalid manifest: ${name}.manifest.yaml`);
        return null;
    }
}

function readPattern(name) {
    const path = join(PATTERNS_DIR, `${name}.pattern.yaml`);
    if (!existsSync(path)) return null;
    try {
        return yaml.load(readFileSync(path, 'utf-8'));
    } catch {
        console.warn(`  ⚠ Skipping invalid pattern: ${name}.pattern.yaml`);
        return null;
    }
}

function getFiles(dir) {
    const files = [];
    if (!existsSync(dir)) return files;

    for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry);
        if (statSync(fullPath).isFile() && !entry.startsWith('.')) {
            // Skip test, story, and README files from the registry
            if (entry.includes('.test.') || entry.includes('.stories.') || entry === 'README.md') continue;

            files.push({
                path: entry,
                content: readFileSync(fullPath, 'utf-8'),
                type: entry === 'index.ts' ? 'util' : 'component',
            });
        }
    }
    return files;
}

function extractDependencies(files) {
    const deps = new Set();
    const devDeps = new Set();

    for (const file of files) {
        // Find external imports
        const importRegex = /from\s+['"]([^./][^'"]*)['"]/g;
        let match;
        while ((match = importRegex.exec(file.content)) !== null) {
            const pkg = match[1].startsWith('@')
                ? match[1].split('/').slice(0, 2).join('/')
                : match[1].split('/')[0];

            // Skip DS0 packages and React (peer dep)
            if (pkg.startsWith('@ds0/') || pkg === 'react' || pkg === 'react-dom') continue;

            deps.add(pkg);
        }
    }

    return {
        dependencies: [...deps],
        devDependencies: [...devDeps],
    };
}

function extractRegistryDeps(files) {
    const deps = new Set();

    for (const file of files) {
        // Find imports from other DS0 components
        const regex = /from\s+['"]@ds0\/react\/([^'"]+)['"]/g;
        let match;
        while ((match = regex.exec(file.content)) !== null) {
            deps.add(match[1]);
        }

        // Also check local relative imports that reference other component directories
        const localRegex = /from\s+['"]\.\.\/([^/'"]+)/g;
        while ((match = localRegex.exec(file.content)) !== null) {
            deps.add(match[1]);
        }
    }

    return [...deps];
}

async function main() {
    console.log('\n📦 DS0 Registry Generator\n');

    const registry = {
        version: '0.1.0',
        components: {},
        recipes: {},
    };

    // Components
    if (existsSync(REACT_COMPONENTS_DIR)) {
        const componentDirs = readdirSync(REACT_COMPONENTS_DIR, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);

        for (const dirName of componentDirs) {
            const componentDir = join(REACT_COMPONENTS_DIR, dirName);
            const files = getFiles(componentDir);
            const manifest = readManifest(dirName);

            if (files.length === 0) continue;

            const { dependencies, devDependencies } = extractDependencies(files);
            const registryDependencies = extractRegistryDeps(files);

            registry.components[dirName] = {
                name: manifest?.name ?? dirName,
                category: manifest?.category ?? 'Unknown',
                description: manifest?.description ?? '',
                files,
                dependencies: ['@ds0/primitives', ...dependencies],
                devDependencies,
                registryDependencies,
            };

            console.log(`  ✅ ${manifest?.name ?? dirName}`);
        }
    }

    // Recipes
    if (existsSync(RECIPES_DIR)) {
        const recipeDirs = readdirSync(RECIPES_DIR, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);

        for (const dirName of recipeDirs) {
            const recipeDir = join(RECIPES_DIR, dirName);
            const files = getFiles(recipeDir);
            const pattern = readPattern(dirName);

            if (files.length === 0) continue;

            const { dependencies, devDependencies } = extractDependencies(files);
            const registryDependencies = extractRegistryDeps(files);

            registry.recipes[dirName] = {
                name: pattern?.name ?? dirName,
                category: pattern?.category ?? 'Unknown',
                description: pattern?.description ?? '',
                files,
                dependencies,
                devDependencies,
                registryDependencies: [...new Set([...registryDependencies, ...(pattern?.composed_of?.map(c => c.toLowerCase().replace(/\s+/g, '-')) ?? [])])],
            };

            console.log(`  ✅ ${pattern?.name ?? dirName} (recipe)`);
        }
    }

    writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2) + '\n');

    const componentCount = Object.keys(registry.components).length;
    const recipeCount = Object.keys(registry.recipes).length;

    console.log(`\n✅ Registry generated: ${componentCount} components, ${recipeCount} recipes\n`);
}

main();
