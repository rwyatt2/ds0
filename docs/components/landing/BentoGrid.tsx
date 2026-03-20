'use client';

import { useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

/* ─── BentoCard with mouse-follow glow ──────────────────────── */
function BentoCard({
    children,
    className = '',
    span = '',
    accent = '',
}: {
    children: ReactNode;
    className?: string;
    span?: string;
    accent?: string;
}) {
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 110, damping: 22 }}
            onMouseMove={handleMouseMove}
            className={`bento-glow group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm ${span} ${className}`}
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
        >
            {/* Top accent line */}
            {accent && (
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-20"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
                />
            )}
            <div className="relative z-10 h-full p-5 md:p-6">{children}</div>
        </motion.div>
    );
}

/* ─── Box 1: Login Form ─────────────────────────────────────── */
function LoginFormBox() {
    return (
        <div className="flex h-full flex-col justify-between">
            <div>
                <span className="section-label">Form Recipe</span>
                <p className="mb-5 text-xs text-white/30">Composable, accessible forms</p>
            </div>
            <div className="space-y-3">
                <div>
                    <label className="mb-1.5 block text-[10px] font-semibold text-white/35 uppercase tracking-widest">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        readOnly
                        className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-sm text-white/70 placeholder-white/20 outline-none"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-[10px] font-semibold text-white/35 uppercase tracking-widest">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        readOnly
                        className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-sm text-white/70 placeholder-white/20 outline-none"
                    />
                </div>
                <button className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-all hover:bg-violet-50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    Sign In
                </button>
            </div>
        </div>
    );
}

/* ─── Box 2: Dashboard Stats ────────────────────────────────── */
function DashboardStatsBox() {
    const stats = [
        { label: 'Components', value: 39, pct: 100, color: 'bg-white', glow: 'rgba(255,255,255,0.4)' },
        { label: 'Tokens', value: 128, pct: 85, color: 'bg-sky-400', glow: 'rgba(56,189,248,0.4)' },
        { label: 'Coverage', value: '97%', pct: 97, color: 'bg-violet-400', glow: 'rgba(139,92,246,0.4)' },
        { label: 'AI Manifests', value: 39, pct: 100, color: 'bg-violet-400', glow: 'rgba(139,92,246,0.4)' },
    ];

    return (
        <div className="flex h-full flex-col">
            <span className="section-label">Dashboard</span>
            <p className="mb-5 text-xs text-white/30">System health at a glance</p>
            <div className="flex-1 space-y-5">
                {stats.map((s) => (
                    <div key={s.label}>
                        <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-xs text-white/45">{s.label}</span>
                            <span className="font-mono text-xs font-semibold text-white/70">{s.value}</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${s.pct}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
                                className={`h-full rounded-full ${s.color}`}
                                style={{ boxShadow: `0 0 8px ${s.glow}` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Box 3: Command Palette ────────────────────────────────── */
function CommandPaletteBox() {
    const items = [
        { icon: '⌘', label: 'Button', shortcut: 'B', active: true },
        { icon: '■', label: 'Card', shortcut: 'C', active: false },
        { icon: '◉', label: 'Dialog', shortcut: 'D', active: false },
        { icon: '≡', label: 'Form', shortcut: 'F', active: false },
    ];

    return (
        <div>
            <span className="section-label">Command Palette</span>
            <p className="mb-4 text-xs text-white/30">Navigate at the speed of thought</p>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/[0.05] px-3 py-2.5 bg-white/[0.01]">
                    <svg className="h-3.5 w-3.5 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    <span className="text-xs text-white/25">Search components...</span>
                </div>
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`flex items-center justify-between px-3 py-2.5 transition-colors ${item.active ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="text-xs text-white/25">{item.icon}</span>
                            <span className={`text-sm ${item.active ? 'text-white font-medium' : 'text-white/50'}`}>{item.label}</span>
                        </div>
                        <kbd className="rounded-md border border-white/[0.07] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-white/35">{item.shortcut}</kbd>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Box 4: Interactive Toggles ────────────────────────────── */
function ToggleBox() {
    const [switches, setSwitches] = useState([true, false, true, false, true]);
    const labels = ['Dark Mode', 'Animations', 'Type Safety', 'Reduced Motion', 'RTL Support'];
    const colors = ['bg-sky-500', 'bg-violet-500', 'bg-emerald-500', 'bg-pink-500', 'bg-amber-500'];

    return (
        <div>
            <span className="section-label">Interactive</span>
            <p className="mb-5 text-xs text-white/30">Try it yourself</p>
            <div className="space-y-4">
                {labels.map((label, i) => (
                    <label key={label} className="flex cursor-pointer items-center justify-between">
                        <span className="text-sm text-white/50">{label}</span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={switches[i]}
                            onClick={() => {
                                const next = [...switches];
                                next[i] = !next[i];
                                setSwitches(next);
                            }}
                            className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${switches[i] ? colors[i] : 'bg-white/10'}`}
                        >
                            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${switches[i] ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                        </button>
                    </label>
                ))}
            </div>
        </div>
    );
}

/* ─── Box 5: Semantic Tokens ──────────────────────────────────── */
function TokensBox() {
    const tokens = [
        { name: 'primary', hex: '#8b5cf6', bg: 'bg-violet-500', glow: 'rgba(139,92,246,0.5)' },
        { name: 'success', hex: '#10b981', bg: 'bg-emerald-500', glow: 'rgba(16,185,129,0.5)' },
        { name: 'warning', hex: '#f59e0b', bg: 'bg-amber-500', glow: 'rgba(245,158,11,0.5)' },
        { name: 'error', hex: '#ef4444', bg: 'bg-red-500', glow: 'rgba(239,68,68,0.5)' },
    ];

    return (
        <div className="flex h-full flex-col">
            <span className="section-label">Tokens</span>
            <p className="mb-5 text-xs text-white/30">Semantic colors</p>
            <div className="flex-1 space-y-4">
                {tokens.map((t) => (
                    <div key={t.name} className="flex items-center gap-3">
                        <div
                            className={`h-6 w-6 shrink-0 rounded-full ${t.bg}`}
                            style={{ boxShadow: `0 0 10px ${t.glow}` }}
                        />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.name}</span>
                            <span className="font-mono text-[10px] text-white/25">{t.hex}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Main BentoGrid ────────────────────────────────────────── */
export function BentoGrid() {
    return (
        <section className="relative w-full px-4 py-24 md:py-32">
            <div className="mx-auto max-w-5xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                    className="mb-16 flex flex-col items-center text-center"
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="section-label">Component Library</motion.div>
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="mb-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Components engineered{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >for scale.</span>
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="text-lg text-white/35">
                        39 composable primitives. Styled, accessible, and ready for production.
                    </motion.p>
                </motion.div>

                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4">
                    <BentoCard span="md:col-span-2 xl:col-span-2 md:row-span-2" accent="#38bdf8">
                        <LoginFormBox />
                    </BentoCard>

                    <BentoCard span="md:row-span-2" accent="#818cf8">
                        <DashboardStatsBox />
                    </BentoCard>

                    <BentoCard span="xl:row-span-2" accent="#a78bfa">
                        <ToggleBox />
                    </BentoCard>

                    <BentoCard span="md:col-span-2 xl:col-span-3" accent="#34d399">
                        <CommandPaletteBox />
                    </BentoCard>

                    <BentoCard span="md:row-span-2 xl:col-span-1 xl:row-span-1" accent="#f59e0b">
                        <TokensBox />
                    </BentoCard>
                </div>
            </div>
        </section>
    );
}
