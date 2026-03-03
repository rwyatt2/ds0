import Link from 'next/link';

export function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/[0.08] bg-white/[0.01] px-4 py-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <span className="text-lg font-bold tracking-tighter text-white/70">
                        DS<span style={{ fontFamily: 'var(--font-geist-mono)', background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>0</span>
                    </span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/20">The zero layer</span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 text-xs text-white/30">
                    <Link href="/docs/getting-started/introduction" className="transition-colors hover:text-white/60">
                        Docs
                    </Link>
                    <Link href="https://github.com/rwyatt2/ds0" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/60">
                        GitHub
                    </Link>
                    <span>MIT License</span>
                </div>

                {/* Copyright */}
                <p className="text-xs text-white/15">
                    © {new Date().getFullYear()} <Link href="https://russellwyatt.me" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/30">Russell Wyatt</Link>
                </p>
            </div>
        </footer>
    );
}
