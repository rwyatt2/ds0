import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // TypeScript
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],

            // React
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',

            // Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Accessibility
            'jsx-a11y/no-autofocus': 'warn',
        },
    },
    {
        ignores: ['dist/', 'node_modules/', '*.config.*', '*.mjs', 'packages/tokens/', '.storybook/'],
    },
);
