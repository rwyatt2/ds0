'use client';

import { CountdownTimer } from '../../../../components/react/countdown-timer';

export function CountdownTimerPreview(): React.ReactElement {
    const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    return (
        <div className="w-full max-w-sm text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Countdown to launch</p>
            <CountdownTimer targetDate={futureDate} />
        </div>
    );
}
