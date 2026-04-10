'use client';

import { Carousel, CarouselItem } from '../../../../components/react/carousel';

const slides = [
    { bg: 'bg-gradient-to-br from-blue-500 to-indigo-600', label: 'Slide 1', desc: 'Building modern interfaces' },
    { bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', label: 'Slide 2', desc: 'Enterprise-grade quality' },
    { bg: 'bg-gradient-to-br from-orange-500 to-red-600', label: 'Slide 3', desc: 'Accessible by default' },
    { bg: 'bg-gradient-to-br from-purple-500 to-pink-600', label: 'Slide 4', desc: '95+ components and growing' },
];

export function CarouselPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <Carousel loop>
                {slides.map((s, i) => (
                    <CarouselItem key={i}>
                        <div className={`${s.bg} rounded-lg flex flex-col items-center justify-center h-48 text-white`}>
                            <p className="text-xl font-bold">{s.label}</p>
                            <p className="text-sm opacity-80 mt-1">{s.desc}</p>
                        </div>
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    );
}
