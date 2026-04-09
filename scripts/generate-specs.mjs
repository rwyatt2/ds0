#!/usr/bin/env node

/**
 * Generate component specs from manifest YAML files.
 * Usage: node scripts/generate-specs.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const manifestsDir = path.join(root, 'packages/ai/manifests');
const specsDir = path.join(root, 'specs/components');

fs.mkdirSync(specsDir, { recursive: true });

const manifests = fs.readdirSync(manifestsDir).filter(f => f.endsWith('.manifest.yaml'));
let generated = 0;

function toArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'object') {
        return Object.entries(val).map(([k, v]) => {
            if (typeof v === 'object' && v !== null) return { name: k, ...v };
            return { name: k, value: v };
        });
    }
    return [val];
}

for (const file of manifests) {
    const name = file.replace('.manifest.yaml', '');
    const specPath = path.join(specsDir, `${name}.spec.md`);
    
    if (fs.existsSync(specPath)) {
        console.log(`  SKIP  ${name}`);
        continue;
    }

    let content, m;
    try {
        content = fs.readFileSync(path.join(manifestsDir, file), 'utf-8');
        m = yaml.load(content);
    } catch (e) {
        console.log(`  ⚠️   ${name} (YAML parse error, skipping)`);
        // Generate a minimal spec
        const pascalName = name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        const minSpec = `# Component Spec: ${pascalName}\n\n## 1. Overview\n\n**Name:** ${pascalName}\n**Description:** See component source and documentation.\n\n> Auto-generated stub. Manifest has YAML syntax issues.\n`;
        fs.writeFileSync(specPath, minSpec);
        generated++;
        continue;
    }

    const pascalName = name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const category = m.category || 'Unknown';
    const description = m.description || `A ${name} component.`;
    
    const useWhen = toArray(m.use_when || m.when_to_use);
    const dontUse = toArray(m.do_not_use_when || m.when_not_to_use);
    const variants = toArray(m.variants);
    const props = toArray(m.props);
    const compound = toArray(m.compound_parts || m.compound);
    const related = toArray(m.related_components || m.related);
    const a11y = m.accessibility || {};

    const spec = `# Component Spec: ${pascalName}

## 1. Overview

**Name:** ${pascalName}
**Category:** ${category}
**Description:** ${description}

## 2. Use Cases

### Use When
${useWhen.map(w => `* ${typeof w === 'string' ? w : w.name || JSON.stringify(w)}`).join('\n') || '* See component documentation'}

### Don't Use When
${dontUse.map(w => `* ${typeof w === 'string' ? w : w.name || JSON.stringify(w)}`).join('\n') || '* See component documentation'}

## 3. Variants

${variants.length > 0
    ? `| Variant | Intent | Example |\n|---|---|---|\n${variants.map(v => 
        `| \`${v.name}\` | ${v.intent || v.description || '—'} | ${v.example || '—'} |`
    ).join('\n')}`
    : '> No named variants.'}

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
${props.map(p => `| \`${p.name}\` | \`${p.type || '—'}\` | \`${p.default ?? '—'}\` | ${p.description || '—'} |`).join('\n')}
| \`className\` | \`string\` | — | Additional CSS classes |
| \`ref\` | \`Ref<HTMLElement>\` | — | Forwarded ref |

## 5. Accessibility

**Role:** ${a11y.role || 'Semantic HTML'}

${a11y.requirements ? `### Requirements\n${toArray(a11y.requirements).map(r => `* ${typeof r === 'string' ? r : r.name}`).join('\n')}` : ''}

## 6. Related Components

${related.length > 0
    ? `| Component | Relationship |\n|---|---|\n${related.map(r => `| ${r.name} | ${r.value || r.relationship || '—'} |`).join('\n')}`
    : '> See component documentation.'}
`;

    fs.writeFileSync(specPath, spec);
    generated++;
    console.log(`  ✅  ${name}`);
}

console.log(`\\nGenerated ${generated} specs in specs/components/`);
