import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { BentoGrid } from '@/components/landing/BentoGrid';
import { AiSection } from '@/components/landing/AiSection';
import { CallToAction } from '@/components/landing/CallToAction';
import { Footer } from '@/components/landing/Footer';
import { SiteHeader } from '@/components/landing/SiteHeader';

export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white/20">
            <SiteHeader />

            {/* Grid texture */}
            <div className="landing-grid-bg absolute inset-0 z-0 opacity-40" />

            {/* Noise texture */}
            <div className="noise-overlay" />

            <main className="relative z-10 flex flex-col items-center">
                <HeroSection />
                <FeaturesSection />
                <BentoGrid />
                <AiSection />
                <CallToAction />
            </main>
            <Footer />
        </div>
    );
}
