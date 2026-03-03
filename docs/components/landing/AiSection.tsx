'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── YAML Content ──────────────────────────────────────────── */
const YAML_LINES = [
    { indent: 0, key: 'decision_tree:', val: '' },
    { indent: 1, key: 'question:', val: '"Need user action?"' },
    { indent: 1, key: 'yes:', val: '' },
    { indent: 2, key: 'question:', val: '"Destructive?"' },
    { indent: 2, key: 'yes:', val: 'Dialog' },
    { indent: 2, key: 'no:', val: 'Button' },
    { indent: 1, key: 'no:', val: '' },
    { indent: 2, key: 'question:', val: '"Status info?"' },
    { indent: 2, key: 'yes:', val: 'Badge' },
    { indent: 2, key: 'no:', val: 'Card' },
];

const CODE_OUTPUT = `import { Button } from 'ds0';
import { Dialog } from 'ds0';

export function DeleteAction() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="destructive">
          Delete Item
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          Are you sure?
        </Dialog.Title>
        <Button variant="outline">
          Cancel
        </Button>
      </Dialog.Content>
    </Dialog>
  );
}`;

/* ─── Typewriter Hook ───────────────────────────────────────── */
function useTypewriter(text: string, speed = 18, delay = 800) {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const delayTimer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(delayTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) return;

        const timer = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);

        return () => clearTimeout(timer);
    }, [displayed, started, text, speed]);

    return displayed;
}

export function AiSection() {
    const typedCode = useTypewriter(CODE_OUTPUT, 16, 1200);

    return (
        <section className="relative w-full px-4 py-24 md:py-32">
            {/* Ambient glow behind the code window */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: '600px',
                    height: '400px',
                    background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div className="mx-auto max-w-5xl relative z-10">
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
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="section-label">AI Integration</motion.div>
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        AI doesn&apos;t guess.
                        <br />
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >It knows.</span>
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="max-w-lg text-lg text-white/35 leading-relaxed">
                        Every component ships with a machine-readable decision tree. AI picks the right component, every time.
                    </motion.p>
                </motion.div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 90, damping: 22 }}
                    className="shimmer-parent w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-black/80 backdrop-blur-xl"
                    style={{
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px -16px rgba(0,0,0,0.6)',
                    }}
                >
                    {/* Title bar */}
                    <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.015] px-5 py-3.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/70" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                        <div className="h-3 w-3 rounded-full bg-green-500/70" />
                        <span className="ml-3 text-[11px] font-medium tracking-wide text-white/25">ds0-ai · decision engine</span>
                    </div>

                    {/* Content area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-white/[0.04] md:divide-y-0 md:divide-x">
                        {/* YAML side */}
                        <div className="p-5 md:p-8">
                            <div className="mb-4 flex items-center gap-2">
                                <span className="text-[10px] font-semibold tracking-widest text-white/20 uppercase">manifest.yaml</span>
                            </div>
                            <pre className="text-[12px] leading-[1.9] font-mono">
                                {YAML_LINES.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06, duration: 0.3 }}
                                    >
                                        <span className="text-white/12 select-none">{String(i + 1).padStart(2, ' ')} </span>
                                        {'  '.repeat(line.indent)}
                                        <span className={line.key === 'yes:' || line.key === 'no:' ? 'text-amber-300/70' : 'text-sky-300/90'}>{line.key}</span>
                                        {line.val && <span className={['Dialog', 'Button', 'Badge', 'Card'].includes(line.val) ? 'text-emerald-400 font-medium' : 'text-emerald-300/80'}> {line.val}</span>}
                                    </motion.div>
                                ))}
                            </pre>
                        </div>

                        {/* Code side */}
                        <div className="p-5 md:p-8">
                            <div className="mb-4 flex items-center gap-2.5">
                                <span className="text-[10px] font-semibold tracking-widest text-white/20 uppercase">AI Output</span>
                                <span className="inline-flex h-4 items-center gap-1 rounded-full bg-violet-500/15 px-2 text-[9px] font-semibold text-violet-400">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    </span>
                                    LIVE
                                </span>
                            </div>
                            <pre className="text-[12px] leading-[1.9] font-mono text-white/55 min-h-[200px]">
                                {typedCode}
                                <span className="inline-block h-4 w-[2px] bg-sky-400 animate-pulse ml-[1px] align-middle" />
                            </pre>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
