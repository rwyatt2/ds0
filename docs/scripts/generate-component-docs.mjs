/**
 * DS0 Component Doc Generator
 *
 * Reads manifests from packages/ai/manifests/
 * Generates MDX pages in content/docs/components/
 *
 * Run: pnpm generate:docs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const MANIFESTS_DIR = join(ROOT, 'packages/ai/manifests');
const OUTPUT_DIR = join(__dirname, '../content/docs/components');

function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function generateMdx(manifest) {
    const kebabName = toKebabCase(manifest.name);

    // Build use_when / don't use lists
    const useWhen = (manifest.use_when || [])
        .map((u) => `    '${escapeQuotes(u)}'`)
        .join(',\n');
    const dontUse = (manifest.do_not_use_when || [])
        .map((d) => `    '${escapeQuotes(d)}'`)
        .join(',\n');

    // Build props table from manifest
    const propsEntries = Object.entries(manifest.props || {})
        .map(([name, def]) => {
            return `  { name: '${name}', type: "${def.type || 'unknown'}", ${def.default ? `default: "${def.default}", ` : ''}${def.required ? 'required: true, ' : ''}description: '${escapeQuotes(def.description || '')}' }`;
        })
        .join(',\n');

    // Build keyboard table
    const keyboardEntries = (manifest.accessibility?.keyboard || [])
        .map((k) => {
            return `  { key: '${escapeQuotes(k.key)}', action: '${escapeQuotes(k.action)}' }`;
        })
        .join(',\n');

    // Build decision tree JSON
    const decisionTree = JSON.stringify(manifest.decision_tree || [], null, 2);

    // Build related links
    const related = Object.entries(manifest.related_components || {})
        .map(([name, desc]) => {
            return `* [${name}](/docs/components/${toKebabCase(name)}) — ${desc}`;
        })
        .join('\n');

    return `---
title: ${manifest.name}
description: ${manifest.description}
---

<InstallSnippet component="${kebabName}" />

## Overview

${manifest.description}

${useWhen || dontUse
            ? `## Guidelines

<DosAndDonts
  dos={[
${useWhen}
  ]}
  donts={[
${dontUse}
  ]}
/>
`
            : ''
        }
${keyboardEntries
            ? `## Accessibility

<KeyboardTable interactions={[
${keyboardEntries}
]} />
`
            : ''
        }
${decisionTree !== '[]'
            ? `## AI Decision Guide

<DecisionTree tree={${decisionTree}} />
`
            : ''
        }
${propsEntries
            ? `## API Reference

<PropsTable props={[
${propsEntries}
]} />
`
            : ''
        }
${related
            ? `## Related

${related}
`
            : ''
        }`;
}

async function main() {
    console.log('\n📝 DS0 Component Doc Generator\n');

    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const manifestFiles = await glob('*.manifest.yaml', { cwd: MANIFESTS_DIR });

    if (manifestFiles.length === 0) {
        console.log('ℹ️  No manifests found.');
        return;
    }

    let generated = 0;

    for (const file of manifestFiles) {
        const content = readFileSync(join(MANIFESTS_DIR, file), 'utf-8');
        const manifest = yaml.load(content);
        const kebabName = toKebabCase(manifest.name);
        const outputPath = join(OUTPUT_DIR, `${kebabName}.mdx`);

        // Only generate if file doesn't exist (don't overwrite hand-edited docs)
        if (existsSync(outputPath)) {
            console.log(`⏭  ${kebabName}.mdx already exists — skipping`);
            continue;
        }

        const mdx = generateMdx(manifest);
        writeFileSync(outputPath, mdx);
        console.log(`✅ Generated ${kebabName}.mdx`);
        generated++;
    }

    console.log(`\n✅ Generated ${generated} component docs\n`);
}

main();
