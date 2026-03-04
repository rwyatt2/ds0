import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: [
        '../components/react/**/*.stories.@(ts|tsx)',
        '../recipes/**/*.stories.@(ts|tsx)',
    ],
    addons: [
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@ds0/primitives': path.resolve(__dirname, '../packages/primitives/src'),
        };
        return config;
    },
};

export default config;
