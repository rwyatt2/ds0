'use client';

import React from 'react';

const tiers = [
    { name: 'Free', price: '$0', features: ['3 projects', 'Basic analytics', 'Community support'], cta: 'Get Started' },
    { name: 'Pro', price: '$19/mo', features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom domains'], cta: 'Start Trial', featured: true },
    { name: 'Team', price: '$49/mo', features: ['Everything in Pro', 'Team management', 'SSO', 'SLA guarantee'], cta: 'Contact Sales' },
];

export function PricingCardsPatternPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl grid grid-cols-3 gap-4">
            {tiers.map(t => (
                <div key={t.name} className={`rounded-xl border p-5 flex flex-col ${t.featured ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : 'bg-card'}`}>
                    {t.featured && <span className="text-[10px] font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full self-start mb-2">Recommended</span>}
                    <h3 className="font-semibold text-sm">{t.name}</h3>
                    <p className="text-2xl font-bold mt-1">{t.price}</p>
                    <ul className="text-xs text-muted-foreground space-y-1.5 mt-4 flex-1">{t.features.map(f => <li key={f}>✓ {f}</li>)}</ul>
                    <button className={`mt-4 w-full rounded-md py-2 text-sm font-medium transition-colors ${t.featured ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border hover:bg-accent'}`}>{t.cta}</button>
                </div>
            ))}
        </div>
    );
}
