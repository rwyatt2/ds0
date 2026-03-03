'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CallToAction() {
    return (
        <section className="relative w-full">
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 md:py-32 flex flex-col items-center text-center">


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
                >
                    <h2 className="mb-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Ready to build at the speed of{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #818cf8 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >thought?</span>
                    </h2>
                    <p className="mb-12 max-w-xl mx-auto text-lg text-white/35 leading-relaxed">
                        Stop wrestling with brittle UI code. Install DS0 today and ship your best work yet.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href="/docs/getting-started/introduction"
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:bg-violet-50 active:scale-[0.97]"
                        >
                            Start Building Now
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="https://github.com/rwyatt2/ds0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.03] px-8 text-base font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-white/[0.2] active:scale-[0.97]"
                        >
                            View on GitHub
                        </Link>
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-1.5 text-sm font-medium text-white/40">
                        <Sparkles className="h-4 w-4 text-violet-400" />
                        <span>Built for the next wave of AI products</span>
                    </div>
                </motion.div>

                {/* Bottom fade line */}
                <div className="mt-20 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </section>
    );
}
