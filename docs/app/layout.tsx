import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { DensityProvider } from '@/components/DensityProvider';

import './globals.css';

export const metadata = {
    title: {
        default: 'DS0 — The AI-Native Design System',
        template: '%s | DS0',
    },
    description:
        'The zero layer. The foundation everything builds from. An open-source design system framework built for humans and AI.',
    openGraph: {
        title: 'DS0 — The AI-Native Design System',
        description:
            'An open-source design system framework built for humans and AI.',
        url: 'https://ds0.systems',
        siteName: 'DS0',
        type: 'website',
        images: [
            {
                url: '/og.png',
                width: 1200,
                height: 630,
                alt: 'DS0 — The AI-Native Design System',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DS0 — The AI-Native Design System',
        description:
            'An open-source design system framework built for humans and AI.',
        images: ['/og.png'],
    },
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}): React.ReactElement {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <RootProvider>
                    <DensityProvider>{children}</DensityProvider>
                </RootProvider>
            </body>
        </html>
    );
}
