import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@ds0/primitives': path.resolve(__dirname, './src/index.ts'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test-setup.ts'],
        css: false,
        passWithNoTests: true,
        include: [
            'src/**/*.test.{ts,tsx}',
            '../../components/react/**/*.test.{ts,tsx}',
        ],
        coverage: {
            provider: 'v8',
            thresholds: {
                statements: 70,
                branches: 60,
                functions: 70,
                lines: 70,
            },
        },
    },
});
