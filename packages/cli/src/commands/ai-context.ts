import { join } from 'path';

import { logger } from '../utils/logger';
import { createSpinner } from '../utils/spinner';
import { getRegistry } from '../utils/registry';
import { ensureDir, writeFile } from '../utils/file-ops';
import { readConfig, configExists } from '../utils/config';
import type { Registry } from '../types';

interface AIContextOptions {
    output: string;
    cwd: string;
}

export async function aiContextCommand(options: AIContextOptions): Promise<void> {
    const cwd = options.cwd;
    const outputDir = join(cwd, options.output);

    logger.header();

    const config = configExists(cwd) ? readConfig(cwd) : undefined;

    const spin = createSpinner('Generating AI context pack...');
    spin.start();

    try {
        const registry = await getRegistry(config?.registryUrl);

        ensureDir(outputDir);

        // 1. System prompt
        const systemPrompt = generateSystemPrompt(registry);
        writeFile(join(outputDir, 'system-prompt.md'), systemPrompt);

        // 2. Component registry JSON
        writeFile(
            join(outputDir, 'component-registry.json'),
            JSON.stringify(registry.components, null, 2)
        );

        // 3. Decision trees (extracted from manifests)
        writeFile(
            join(outputDir, 'decision-trees.json'),
            JSON.stringify(extractDecisionTrees(registry), null, 2)
        );

        // 4. Token reference
        writeFile(
            join(outputDir, 'token-reference.json'),
            '{}' // Placeholder — will read from resolved tokens
        );

        spin.succeed('AI context pack generated');

        logger.blank();
        logger.info(`Output: ${outputDir}/`);
        logger.step('system-prompt.md — Paste into any AI chat');
        logger.step('component-registry.json — All component metadata');
        logger.step('decision-trees.json — Component decision logic');
        logger.step('token-reference.json — All resolved token values');
        logger.blank();
        logger.info('Paste the system prompt into ChatGPT, Claude, or any AI tool');
        logger.info('to give it full knowledge of your DS0 setup.');
        logger.blank();
    } catch (err) {
        spin.fail('Failed to generate AI context');
        logger.error(String(err));
    }
}

function generateSystemPrompt(registry: Registry): string {

    const componentList = Object.entries(registry.components)
        .map(([, val]) => `- **${val.name}** (${val.category}): ${val.description}`)
        .join('\n');

    const recipeList = Object.entries(registry.recipes ?? {})
        .map(([, val]) => `- **${val.name}** (${val.category}): ${val.description}`)
        .join('\n');

    return `# DS0 Design System — AI Context

You are building UI with DS0, an AI-native design system framework.
Always use DS0 components instead of raw HTML for any element DS0 covers.
Always use semantic token classes (bg-primary, text-foreground) — never raw Tailwind palette colors (bg-blue-500).
Always follow WAI-ARIA accessibility patterns.
Always use the cn() utility for conditional classes.

## Available Components

${componentList}

## Available Recipes (Pre-built patterns)

${recipeList}

## Token System

- Colors: primary, secondary, destructive, success, warning, muted, accent
- Every background color has a matching -foreground token
- Spacing: 4px base unit scale (1=4px, 2=8px, 4=16px, etc.)
- Sizes: sm, md, lg
- Radius: sm, md, lg, xl, full

## Component Usage Rules

1. Import from the local components directory (e.g., @/components/ds0/button)
2. All interactive components support isDisabled, not HTML disabled
3. All components accept className for customization
4. Use cva variants, not inline conditional styles
5. Use forwardRef pattern — all components accept ref

## Decision Making

When choosing a component:
- Action trigger → Button (or IconButton for icon-only)
- Navigation → Link
- Text input → TextField (single line) or TextArea (multi-line)
- Selection from options → Select (4+ options) or RadioGroup (2-3 options)
- Boolean toggle → Switch (immediate effect) or Checkbox (form submission)
- Modal content → Dialog
- Contextual overlay → Popover (interactive) or Tooltip (text hint)
- Side panel → Drawer
- Status message → Alert (persistent) or Toast (temporary)
- Loading → Spinner (unknown duration), Skeleton (known shape), Progress (known %)
`;
}

function extractDecisionTrees(registry: Registry): Record<string, unknown> {
    const trees: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(registry.components)) {
        if (val.decisionTree) {
            trees[key] = val.decisionTree;
        }
    }
    return trees;
}
