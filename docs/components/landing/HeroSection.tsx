'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Copy, ArrowRight } from 'lucide-react';

/* ─── Faux AI Context Panel ──────────────────────────────── */
function AIContextPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 22 }}
            className="relative z-10 w-[260px] h-[280px] rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl hidden md:flex md:flex-col"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 0 40px rgba(0,0,0,0.3)' }}
        >
            <div className="mb-3 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 text-[10px] font-semibold tracking-widest text-white/30 uppercase">manifest.yaml</span>
            </div>
            <pre className="text-[10px] leading-[1.85] font-mono flex-1 overflow-hidden whitespace-pre">
                <span className="text-violet-300/80">{"name"}</span><span className="text-white/30">{": "}</span><span className="text-emerald-300/70">{"Button\n"}</span>
                <span className="text-violet-300/80">{"category"}</span><span className="text-white/30">{": "}</span><span className="text-amber-300/60">{"Actions\n\n"}</span>
                <span className="text-violet-300/80">{"use_when"}</span><span className="text-white/30">{":\n"}</span>
                <span className="text-white/40">{"  - "}</span><span className="text-white/60">{"User triggers action\n"}</span>
                <span className="text-white/40">{"  - "}</span><span className="text-white/60">{"Submitting a form\n\n"}</span>
                <span className="text-violet-300/80">{"decision_tree"}</span><span className="text-white/30">{":\n"}</span>
                <span className="text-white/40">{"  - "}</span><span className="text-sky-300/70">{"condition"}</span><span className="text-white/30">{": "}</span><span className="text-white/50">{"Is primary?\n"}</span>
                <span className="text-white/40">{"    "}</span><span className="text-sky-300/70">{"yes"}</span><span className="text-white/30">{": "}</span><span className="text-emerald-300/60">{"variant=primary"}</span>
            </pre>
        </motion.div>
    );
}

/* ─── Faux Code Editor ──────────────────────────────────────── */
function CodePanel({ color }: { color: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 22 }}
            className="relative z-10 w-[260px] h-[280px] rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl hidden md:flex md:flex-col"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 0 40px rgba(0,0,0,0.3)' }}
        >
            <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 text-[10px] font-semibold tracking-widest text-white/30 uppercase">Editor</span>
            </div>
            <pre className="text-[11.5px] leading-[1.9] font-mono flex-1">
                <span className="text-white/35">{'import '}</span>
                <span className="text-sky-300/80">{'{ Button }'}</span>
                <span className="text-white/35">{' from '}</span>
                <span className="text-emerald-300/70">{`'ds0'`}</span>
                <span className="text-white/25">;</span>
                {'\n\n'}
                <span className="text-white/25">{'<'}</span>
                <span className="text-sky-300">Button</span>
                {'\n'}
                <span className="text-purple-300/70">{'  variant'}</span>
                <span className="text-white/25">=</span>
                <span className="text-amber-300/70">{'"primary"'}</span>
                {'\n'}
                <span className="text-purple-300/70">{'  color'}</span>
                <span className="text-white/25">=</span>
                <span className="text-amber-300/70">{`"${color}"`}</span>
                {'\n'}
                <span className="text-white/25">{'>'}</span>
                {'\n'}
                <span className="text-white/60">{'  Click me'}</span>
                {'\n'}
                <span className="text-white/25">{'</'}</span>
                <span className="text-sky-300">Button</span>
                <span className="text-white/25">{'>'}</span>
            </pre>
        </motion.div>
    );
}

const STATS = [
    { value: '39', label: 'Components' },
    { value: '128', label: 'Tokens' },
    { value: '97%', label: 'Test Coverage' },
    { value: 'YAML', label: 'AI Manifests' },
];

/* ─── Sync Beam Animation ───────────────────────────────────── */
function SyncBeam({ color }: { color: string }) {
    return (
        <svg
            className="pointer-events-none absolute inset-0 hidden md:block h-full w-full z-0"
            viewBox="0 0 760 280"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
        >
            <defs>
                <linearGradient id="syncGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                    <stop offset="50%" stopColor={color} stopOpacity="0.8" style={{ transition: 'stop-color 0.5s ease' }} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                </linearGradient>

                <filter id="glow-particle">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Base Connector Line */}
            <path
                id="syncPath"
                d="M 130 140 C 300 0, 460 0, 630 140"
                fill="none"
                stroke="url(#syncGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                opacity="0.4"
                className="animate-[dash-march_20s_linear_infinite]"
                style={{ transition: 'stroke 0.5s ease' }}
            />

            {/* Forward Particles (AI → Code) */}
            <circle r="3" fill="#38bdf8" filter="url(#glow-particle)" style={{ animation: 'sync-particle 3s infinite linear' }}>
                <animateMotion dur="3s" repeatCount="indefinite" path="M 130 140 C 300 0, 460 0, 630 140" />
            </circle>
            <circle r="3" fill="#38bdf8" filter="url(#glow-particle)" style={{ animation: 'sync-particle 3s infinite linear 1.5s' }}>
                <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" path="M 130 140 C 300 0, 460 0, 630 140" />
            </circle>

            {/* Reverse Particles (Code → AI) */}
            <circle r="2" fill="#34d399" filter="url(#glow-particle)" style={{ animation: 'sync-particle 4s infinite linear 0.5s' }}>
                <animateMotion dur="4s" repeatCount="indefinite" begin="0.5s" keyPoints="1;0" keyTimes="0;1" calcMode="linear" path="M 130 140 C 300 0, 460 0, 630 140" />
            </circle>
            <circle r="2" fill="#34d399" filter="url(#glow-particle)" style={{ animation: 'sync-particle 4s infinite linear 2.5s' }}>
                <animateMotion dur="4s" repeatCount="indefinite" begin="2.5s" keyPoints="1;0" keyTimes="0;1" calcMode="linear" path="M 130 140 C 300 0, 460 0, 630 140" />
            </circle>
        </svg>
    );
}

/* ─── Hero Section ──────────────────────────────────────────── */
export function HeroSection() {
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ['#ffffff', '#38bdf8', '#818cf8', '#a78bfa', '#34d399'];
    const currentColor = colors[colorIndex];
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('npx ds0 init');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative flex w-full flex-col items-center px-4 pt-24 pb-20 md:pt-28 md:pb-28">
            {/* Spotlight radial — own clip wrapper so it doesn't clip text */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] overflow-hidden">
                <div className="spotlight-glow" />
            </div>

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="shimmer-parent relative z-10 mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm"
            >
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
                </span>
                <span className="font-semibold tracking-wide">Open Source</span>
                <span className="text-white/20">·</span>
                <span>MIT Licensed</span>
            </motion.div>

            {/* Title Lock-up */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.7, type: 'spring', stiffness: 90 }}
                className="relative z-10 mb-6 flex flex-col items-center text-center"
            >
                <h1 className="flex items-center text-[clamp(3.5rem,9vw,7.5rem)] font-black leading-[0.88] tracking-[-0.04em]">
                    <span style={{ fontFamily: 'var(--font-geist-sans)', color: '#ffffff' }}>DS</span>
                    <span
                        style={{
                            fontFamily: 'var(--font-geist-mono)',
                            background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 50%, #a78bfa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >0</span>
                </h1>
                <p className="mt-5 text-[clamp(1rem,2vw,1.25rem)] font-medium tracking-tight text-white/55">
                    The <span className="text-white/75">AI-Native</span> Design System
                </p>
            </motion.div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.6 }}
                className="mb-10 max-w-md text-center text-base text-white/45 leading-relaxed"
            >
                DS0 is the foundational zero layer — code and design perfectly synced for humans and AI alike.
            </motion.p>

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative z-10 mb-14 flex flex-col items-center gap-3 sm:flex-row"
            >
                <Link
                    href="/docs/getting-started/introduction"
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-7 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_32px_rgba(139,92,246,0.4)] hover:bg-violet-50 active:scale-[0.97]"
                >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                    href="https://github.com/rwyatt2/ds0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] px-7 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:bg-white/[0.06] hover:border-white/[0.18] active:scale-[0.97]"
                >
                    View on GitHub
                </Link>
                <button
                    onClick={handleCopy}
                    className="group relative flex h-11 cursor-copy items-center rounded-lg border border-white/[0.07] bg-white/[0.02] pl-5 pr-11 font-mono text-sm text-white/40 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/60 active:scale-[0.97]"
                    title="Copy command"
                >
                    <span className="mr-2 text-white/20 pointer-events-none select-none">$</span>
                    <span className="pointer-events-none">npx ds0 init</span>
                    <div className={`absolute right-3 flex items-center justify-center transition-all duration-200 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>
                        {copied ? <Check className="h-3.5 w-3.5 text-violet-400" /> : <Copy className="h-3.5 w-3.5 text-white/35" />}
                    </div>
                </button>
            </motion.div>

            {/* Stats Strip */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="relative z-10 mb-20 flex items-center gap-6 sm:gap-10"
            >
                {STATS.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
                        {i > 0 && <div className="h-4 w-px bg-white/10" />}
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-lg font-bold tracking-tight text-white tabular-nums">{stat.value}</span>
                            <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Interactive Panel */}
            <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, type: 'spring', stiffness: 75, damping: 20 }}
                className="relative flex items-center justify-center gap-4 md:gap-16"
            >
                {/* SVG Connection Beam (rendered first / behind) */}
                <SyncBeam color={currentColor} />

                <AIContextPanel />

                {/* Center: floating button + sync label */}
                <div className="relative flex flex-col items-center gap-5 z-10 mx-6">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                        className="relative"
                    >
                        {/* Expanding color ripple ring */}
                        <motion.div
                            key={currentColor}
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{ opacity: 0, scale: 1.6 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{ border: `2px solid ${currentColor}` }}
                        />
                        <button
                            onClick={() => setColorIndex((prev) => (prev + 1) % colors.length)}
                            className="relative z-10 inline-flex h-12 items-center justify-center rounded-xl px-8 text-base font-semibold shadow-[0_0_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: currentColor,
                                color: currentColor === '#ffffff' ? 'black' : 'white',
                                boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 8px 32px ${currentColor}80`,
                                filter: currentColor === '#ffffff' ? 'drop-shadow(0 0 12px rgba(255,255,255,0.2))' : `drop-shadow(0 0 12px ${currentColor}40)`,
                            }}
                        >
                            Click me
                        </button>
                    </motion.div>

                    {/* Glowing Sync Pill */}
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-2.5 pr-3 py-1 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                        <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                            <div className="absolute h-full w-full rounded-full" style={{ backgroundColor: currentColor, animation: 'sync-pulse 2s infinite' }} />
                            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: currentColor, boxShadow: `0 0 8px ${currentColor}` }} />
                        </div>
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.15em] pt-[1px]">Synced Live</span>
                    </div>
                </div>

                <CodePanel color={currentColor} />
            </motion.div>
        </section>
    );
}
