/**
 * DS0 Manifest Validator
 *
 * Ensures every component manifest has all required fields.
 * Run via: pnpm validate:manifests
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const REQUIRED_FIELDS = [
    'name',
    'category',
    'description',
    'use_when',
    'do_not_use_when',
    'variants',
    'accessibility',
    'related_components',
];

async function validate() {
    console.log('\n🔍 DS0 Manifest Validator\n');

    const manifests = await glob('packages/ai/manifests/*.manifest.yaml', {
        cwd: ROOT,
    });

    if (manifests.length === 0) {
        console.log('ℹ️  No manifests found yet. This is expected before Phase 2.');
        return;
    }

    let hasErrors = false;

    for (const manifestPath of manifests) {
        const fullPath = join(ROOT, manifestPath);
        const content = readFileSync(fullPath, 'utf-8');
        const manifest = yaml.load(content);

        const missing = REQUIRED_FIELDS.filter((field) => !manifest[field]);

        if (missing.length > 0) {
            console.error(`❌ ${manifestPath}: Missing fields: ${missing.join(', ')}`);
            hasErrors = true;
        } else {
            console.log(`✅ ${manifestPath}`);
        }
    }

    if (hasErrors) {
        console.error('\n❌ Manifest validation failed');
        process.exit(1);
    } else {
        console.log('\n✅ All manifests valid!\n');
    }
}

validate();
