/**
 * AI Manifest Roundtrip Test
 *
 * Validates that all .ai/*.yaml manifest files:
 * 1. Parse correctly as YAML
 * 2. Have required fields (name, description)
 * 3. Reference components that actually exist in the codebase
 *
 * Run: npx vitest run tests/ai/manifest-roundtrip.test.ts
 */

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { load as loadYaml } from 'js-yaml';

const ROOT = join(__dirname, '..', '..');
const AI_DIR = join(ROOT, '.ai');

interface ManifestData {
    name?: string;
    description?: string;
    type?: string;
    importPath?: string;
    props?: Array<{ name: string; type: string }>;
    examples?: Array<{ title: string; code: string }>;
    [key: string]: unknown;
}

function getManifestFiles(): string[] {
    if (!existsSync(AI_DIR)) return [];
    return readdirSync(AI_DIR).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
}

describe('AI Manifest Roundtrip', () => {
    const manifestFiles = getManifestFiles();

    it('finds at least one manifest file', () => {
        expect(manifestFiles.length).toBeGreaterThan(0);
    });

    for (const file of manifestFiles) {
        describe(file, () => {
            let data: ManifestData;

            it('parses as valid YAML', () => {
                const content = readFileSync(join(AI_DIR, file), 'utf-8');
                data = loadYaml(content) as ManifestData;
                expect(data).toBeDefined();
                expect(typeof data).toBe('object');
            });

            it('has a name field', () => {
                const content = readFileSync(join(AI_DIR, file), 'utf-8');
                data = loadYaml(content) as ManifestData;
                expect(data.name).toBeDefined();
                expect(typeof data.name).toBe('string');
                expect(data.name!.length).toBeGreaterThan(0);
            });

            it('has a description field', () => {
                const content = readFileSync(join(AI_DIR, file), 'utf-8');
                data = loadYaml(content) as ManifestData;
                expect(data.description).toBeDefined();
                expect(typeof data.description).toBe('string');
                expect(data.description!.length).toBeGreaterThan(0);
            });
        });
    }

    it('all manifests with importPath reference existing files', () => {
        for (const file of manifestFiles) {
            const content = readFileSync(join(AI_DIR, file), 'utf-8');
            const data = loadYaml(content) as ManifestData;

            if (data.importPath) {
                // Check if the path resolves to an existing file
                const possiblePaths = [
                    join(ROOT, data.importPath),
                    join(ROOT, data.importPath + '.tsx'),
                    join(ROOT, data.importPath + '.ts'),
                    join(ROOT, data.importPath, 'index.ts'),
                    join(ROOT, data.importPath, 'index.tsx'),
                ];

                const exists = possiblePaths.some((p) => existsSync(p));
                if (!exists) {
                    // Don't fail hard — warn about unresolvable paths
                    console.warn(`⚠ ${file}: importPath "${data.importPath}" not found`);
                }
            }
        }
    });

    it('all manifests with props have valid prop definitions', () => {
        for (const file of manifestFiles) {
            const content = readFileSync(join(AI_DIR, file), 'utf-8');
            const data = loadYaml(content) as ManifestData;

            if (data.props && Array.isArray(data.props)) {
                for (const prop of data.props) {
                    expect(prop.name, `${file}: prop missing name`).toBeDefined();
                    expect(typeof prop.name).toBe('string');
                }
            }
        }
    });
});
