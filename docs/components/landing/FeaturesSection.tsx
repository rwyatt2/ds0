'use client';

import { motion } from 'framer-motion';
import { Cpu, Figma, Zap, ShieldCheck, Palette, MoonStar } from 'lucide-react';

const features = [
    {
        fig: 'FIG. 1.1',
        icon: <Cpu className="h-4 w-4" />,
        iconColor: 'text-violet-400',
        title: 'AI-Native Foundation',
        description: 'Every component ships with a machine-readable decision tree. AI picks the right component without guessing — no hallucination, no ambiguity.',
    },
    {
        fig: 'FIG. 1.2',
        icon: <Figma className="h-4 w-4" />,
        iconColor: 'text-white',
        title: 'Figma to Code Sync',
        description: 'Design tokens and component APIs are automatically synchronized between Figma and your codebase. Stop fighting drift forever.',
    },
    {
        fig: 'FIG. 1.3',
        icon: <Zap className="h-4 w-4" />,
        iconColor: 'text-amber-400',
        title: 'Framer Motion Ready',
        description: 'Physics-based spring animations built in from day one. Every interaction feels alive — no retrofitting, no fighting defaults.',
    },
    {
        fig: 'FIG. 1.4',
        icon: <ShieldCheck className="h-4 w-4" />,
        iconColor: 'text-emerald-400',
        title: 'Radix-Powered Accessibility',
        description: 'WAI-ARIA compliant primitives built on Radix UI. Keyboard navigation, focus management, and screen reader support out of the box.',
    },
    {
        fig: 'FIG. 1.5',
        icon: <Palette className="h-4 w-4" />,
        iconColor: 'text-pink-400',
        title: 'Obsessive Polish',
        description: 'Deep dark mode, 1px frosted borders, and subtle radial glows. The precise aesthetic that ships with zero configuration.',
    },
    {
        fig: 'FIG. 1.6',
        icon: <MoonStar className="h-4 w-4" />,
        iconColor: 'text-sky-400',
        title: 'Zero-Config Dark Mode',
        description: 'Semantic CSS variables handle theme switching automatically. No context providers, no class toggling, no complex setup.',
    },
];

export function FeaturesSection() {
    return (
        <section className="relative w-full py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 flex flex-col items-center text-center"
                >
                    <div className="section-label">Why DS0</div>
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Built for modern{' '}
                        <span className="text-white/40">product teams</span>
                    </h2>
                    <p className="max-w-md text-base text-white/35 leading-relaxed">
                        Everything you need to ship stunning, accessible applications — without the boilerplate.
                    </p>
                </motion.div>

                {/* Ambient glow behind feature grid */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        width: '800px',
                        height: '600px',
                        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.03) 0%, transparent 60%)',
                        filter: 'blur(80px)',
                    }}
                />

                {/* 2-Column Feature Grid */}
                <div className="grid relative grid-cols-1 gap-0 sm:grid-cols-2 border border-white/[0.06] rounded-2xl overflow-hidden">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className={[
                                'group relative p-7 transition-colors duration-200',
                                index === 0 ? 'bg-gradient-to-br from-violet-500/[0.05] via-transparent to-transparent hover:bg-white/[0.02]' : 'hover:bg-white/[0.02]',
                                // Right border on left column items
                                index % 2 === 0 ? 'sm:border-r border-white/[0.06]' : '',
                                // Bottom border on all but the last two
                                index < features.length - 2 ? 'border-b border-white/[0.06]' : '',
                                // Mobile: border on all but last
                                index < features.length - 1 ? 'max-sm:border-b max-sm:border-white/[0.06]' : '',
                            ].join(' ')}
                        >
                            {/* Fig label + icon */}
                            <div className="mb-4 flex items-center justify-between">
                                <span className="font-mono text-[10px] font-medium tracking-widest text-white/20 uppercase">
                                    {feature.fig}
                                </span>
                                <div className={`${feature.iconColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                                    {feature.icon}
                                </div>
                            </div>

                            <h3 className="mb-2 text-[15px] font-semibold text-white/85 group-hover:text-white transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-white/35 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
