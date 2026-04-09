/**
 * WCAG AA Contrast Validation Script
 *
 * Validates that all DS0 semantic foreground/background token pairs
 * meet WCAG 2.1 AA contrast requirements:
 *   - Normal text: 4.5:1
 *   - Large text (18px+ or 14px+ bold): 3:1
 *   - UI components: 3:1
 *
 * Usage: npx tsx scripts/check-contrast.ts
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// ─── Color Utilities ──────────────────────────────────────────

function hexToRGB(hex: string): [number, number, number] {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return [r, g, b];
}

function sRGBtoLinear(value: number): number {
    const v = value / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
    const [r, g, b] = hexToRGB(hex);
    return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

function contrastRatio(hex1: string, hex2: string): number {
    const l1 = relativeLuminance(hex1);
    const l2 = relativeLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

// ─── Token Loading ────────────────────────────────────────────

interface TokenFile {
    [key: string]: {
        [key: string]: {
            $value?: string;
            $type?: string;
            [key: string]: unknown;
        } | string;
    };
}

function loadTokens(filePath: string): Record<string, string> {
    const content = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content) as TokenFile;
    const tokens: Record<string, string> = {};

    function extract(obj: unknown, prefix: string) {
        if (obj && typeof obj === 'object' && '$value' in (obj as Record<string, unknown>)) {
            const val = (obj as Record<string, unknown>)['$value'] as string;
            if (typeof val === 'string' && val.startsWith('#')) {
                tokens[prefix] = val;
            }
        } else if (obj && typeof obj === 'object') {
            for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
                if (!key.startsWith('$')) {
                    extract(value, prefix ? `${prefix}.${key}` : key);
                }
            }
        }
    }

    extract(data, '');
    return tokens;
}

// ─── Validation ───────────────────────────────────────────────

/** Semantic foreground/background pairs to validate */
const PAIRS: Array<{ fg: string; bg: string; label: string; largeText?: boolean }> = [
    { fg: 'color.foreground', bg: 'color.background', label: 'Body text' },
    { fg: 'color.card-foreground', bg: 'color.card', label: 'Card text' },
    { fg: 'color.popover-foreground', bg: 'color.popover', label: 'Popover text' },
    { fg: 'color.primary-foreground', bg: 'color.primary', label: 'Primary button text' },
    { fg: 'color.secondary-foreground', bg: 'color.secondary', label: 'Secondary button text' },
    { fg: 'color.accent-foreground', bg: 'color.accent', label: 'Accent text' },
    { fg: 'color.destructive-foreground', bg: 'color.destructive', label: 'Destructive button text' },
    { fg: 'color.success-foreground', bg: 'color.success', label: 'Success text' },
    { fg: 'color.warning-foreground', bg: 'color.warning', label: 'Warning text' },
    { fg: 'color.muted-foreground', bg: 'color.background', label: 'Muted text' },
];

function run() {
    const tokensDir = join(__dirname, '..', 'tokens');
    const coreTokens = loadTokens(join(tokensDir, '_core', 'color.json'));
    const semanticTokens = loadTokens(join(tokensDir, '_semantic', 'color.json'));

    const allTokens = { ...coreTokens, ...semanticTokens };

    console.log('\n🎨 DS0 Contrast Validation (WCAG 2.1 AA)\n');
    console.log('─'.repeat(60));

    let passed = 0;
    let failed = 0;

    for (const pair of PAIRS) {
        const fgHex = allTokens[pair.fg];
        const bgHex = allTokens[pair.bg];

        if (!fgHex || !bgHex) {
            console.log(`  ⚠  ${pair.label.padEnd(30)} Token not found (${!fgHex ? pair.fg : pair.bg})`);
            continue;
        }

        const ratio = contrastRatio(fgHex, bgHex);
        const required = pair.largeText ? 3.0 : 4.5;
        const pass = ratio >= required;

        const icon = pass ? '✓' : '✕';
        const color = pass ? '\x1b[32m' : '\x1b[31m';
        const reset = '\x1b[0m';

        console.log(`  ${color}${icon}${reset}  ${pair.label.padEnd(30)} ${ratio.toFixed(2)}:1 (requires ${required}:1)`);

        if (pass) passed++;
        else failed++;
    }

    console.log('\n' + '─'.repeat(60));
    console.log(`  ${passed} passed, ${failed} failed\n`);

    if (failed > 0) {
        process.exit(1);
    }
}

run();
