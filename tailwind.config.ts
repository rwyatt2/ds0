import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './components/react/**/*.{ts,tsx}',
        './recipes/**/*.{ts,tsx}',
        './docs/**/*.{ts,tsx,mdx}',
    ],
    // presets: [ds0Preset], // Uncomment after first token build
    theme: {
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--ds0-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--ds0-accordion-content-height)' },
                    to: { height: '0' },
                },
                'progress-indeterminate': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(400%)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'progress-indeterminate': 'progress-indeterminate 1.5s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};

export default config;
