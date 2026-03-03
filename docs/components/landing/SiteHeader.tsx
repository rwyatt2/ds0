'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function SiteHeader() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-white/[0.04] bg-black/50 px-4 backdrop-blur-xl sm:px-6 lg:px-8"
        >
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <span className="text-[17px] font-extrabold tracking-tighter text-white uppercase">
                        Design System{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 50%, #a78bfa 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Zer<span style={{ fontFamily: 'var(--font-geist-mono)', fontWeight: 800, fontSize: '110%', marginLeft: '-0.02em' }}>0</span>
                        </span>
                    </span>
                </Link>

                {/* Nav */}
                <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-white/50">
                    <Link href="/docs/getting-started/introduction" className="transition-colors hover:text-white">
                        Docs
                    </Link>
                    <Link href="/docs/components/button" className="transition-colors hover:text-white">
                        Components
                    </Link>
                    <Link href="https://github.com/rwyatt2/ds0" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                        GitHub
                    </Link>
                </nav>

                {/* Mobile placeholder / extra actions could go here */}
                <div className="sm:hidden flex items-center">
                    <Link href="/docs/getting-started/introduction" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                        Menu
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
