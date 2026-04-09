/**
 * DS0 Figma Token Sync
 *
 * Pushes resolved tokens to Figma Variables via the REST API.
 * Requires FIGMA_FILE_ID and FIGMA_ACCESS_TOKEN environment variables.
 *
 * Run via: pnpm sync:figma
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function syncToFigma() {
    console.log('\n🎨 DS0 Figma Sync\n');

    const { FIGMA_FILE_ID, FIGMA_ACCESS_TOKEN } = process.env;

    if (!FIGMA_FILE_ID || !FIGMA_ACCESS_TOKEN) {
        console.log('⚠️  Missing environment variables:');
        if (!FIGMA_FILE_ID) console.log('   - FIGMA_FILE_ID');
        if (!FIGMA_ACCESS_TOKEN) console.log('   - FIGMA_ACCESS_TOKEN');
        console.log('\n   Set these in .env.local to enable Figma sync.');
        console.log('   Skipping Figma sync.\n');
        return;
    }

    const tokensPath = join(ROOT, 'packages/tokens/json/resolved.json');
    const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));

    const variables = Object.entries(tokens).map(([key, value]) => ({
        name: key.replace(/\./g, '/'),
        resolvedValue: value,
    }));

    console.log(`📤 Pushing ${variables.length} tokens to Figma...`);

    // TODO: Implement full Figma REST API call
    // POST https://api.figma.com/v1/files/{file_id}/variables
    // See: https://www.figma.com/developers/api#variables

    console.log('⚠️  Figma sync is a placeholder — implement REST API call');
    console.log(`   Would push ${variables.length} variables to file ${FIGMA_FILE_ID}\n`);
}

syncToFigma();
