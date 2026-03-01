import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: [
        '../components/react/**/*.stories.@(ts|tsx)',
        '../recipes/**/*.stories.@(ts|tsx)',
    ],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};

export default config;
