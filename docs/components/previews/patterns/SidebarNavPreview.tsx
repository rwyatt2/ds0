'use client';

import { Home, BarChart3, Settings, Users, LogOut, ChevronDown } from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Users, label: 'Team', active: false },
    { icon: Settings, label: 'Settings', active: false },
];

export function SidebarNavPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-[240px]">
            <div className="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800">
                {/* Header */}
                <div className="p-4 border-b dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-sm">D</div>
                        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">DS0 App</span>
                    </div>
                </div>
                {/* Nav items */}
                <div className="p-2 space-y-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.label}
                                type="button"
                                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${item.active
                                        ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
                {/* Footer */}
                <div className="border-t p-2 dark:border-gray-800">
                    <button type="button" className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
