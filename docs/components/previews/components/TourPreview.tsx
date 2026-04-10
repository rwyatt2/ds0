'use client';

import { Tour } from '../../../../components/react/tour';

const steps = [
    { id: '1', title: 'Welcome to DS0', content: 'This guided tour will walk you through the key features of the design system.' },
    { id: '2', title: 'Browse Components', content: 'Explore 95+ production-ready components with full documentation and previews.' },
    { id: '3', title: 'Copy & Customize', content: 'Each component is fully customizable via CSS variables and variant props.' },
    { id: '4', title: 'Ready to Build!', content: 'Start building enterprise-grade interfaces with DS0.' },
];

export function TourPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md">
            <Tour
                steps={steps}
                active
                onComplete={() => {}}
                onSkip={() => {}}
            />
        </div>
    );
}
