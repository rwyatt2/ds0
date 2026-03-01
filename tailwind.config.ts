import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './components/react/**/*.{ts,tsx}',
        './recipes/**/*.{ts,tsx}',
        './docs/**/*.{ts,tsx,mdx}',
    ],
    // presets: [ds0Preset], // Uncomment after first token build
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
