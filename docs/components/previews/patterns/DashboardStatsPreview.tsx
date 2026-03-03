'use client';

import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';

const stats = [
    { label: 'Revenue', value: '$45,231', change: 12.5, period: 'from last month', icon: DollarSign, up: true },
    { label: 'Users', value: '2,350', change: 3.1, period: 'from last month', icon: Users, up: false },
    { label: 'Orders', value: '1,234', change: 8.2, period: 'from last month', icon: ShoppingCart, up: true },
    { label: 'Conversion', value: '3.2%', change: 0.5, period: 'from last month', icon: Activity, up: true },
];

export function DashboardStatsPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => {
                const Icon = s.icon;
                return (
                    <div key={s.label} className="rounded-lg border bg-white p-4 dark:bg-gray-900 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{s.label}</span>
                            <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                            {s.up ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                            ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                            <span className={`text-xs font-medium ${s.up ? 'text-green-600' : 'text-red-600'}`}>
                                {s.up ? '+' : '-'}{s.change}%
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{s.period}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
