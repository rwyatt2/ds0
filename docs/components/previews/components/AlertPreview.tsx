'use client';

import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const alerts = [
    { variant: 'Info', icon: Info, bg: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200', iconCls: 'text-blue-600 dark:text-blue-400', desc: 'This is an informational message.' },
    { variant: 'Success', icon: CheckCircle2, bg: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200', iconCls: 'text-green-600 dark:text-green-400', desc: 'Operation completed successfully.' },
    { variant: 'Warning', icon: AlertTriangle, bg: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200', iconCls: 'text-amber-600 dark:text-amber-400', desc: 'Please review before continuing.' },
    { variant: 'Destructive', icon: XCircle, bg: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200', iconCls: 'text-red-600 dark:text-red-400', desc: 'Something went wrong. Please try again.' },
];

export function AlertPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-3">
            {alerts.map((a) => {
                const Icon = a.icon;
                return (
                    <div key={a.variant} className={`flex items-start gap-3 rounded-lg border p-4 ${a.bg}`}>
                        <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${a.iconCls}`} />
                        <div>
                            <p className="text-sm font-medium">{a.variant}</p>
                            <p className="text-sm opacity-80">{a.desc}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
