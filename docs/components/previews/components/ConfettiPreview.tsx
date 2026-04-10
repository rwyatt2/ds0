'use client';

import React, { useState } from 'react';
import { Confetti } from '../../../../components/react/confetti';

export function ConfettiPreview(): React.ReactElement {
    const [active, setActive] = useState(false);

    return (
        <div className="w-full max-w-sm text-center">
            <button
                onClick={() => setActive(true)}
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
                🎉 Launch Confetti
            </button>
            <Confetti isActive={active} onComplete={() => setActive(false)} />
        </div>
    );
}
