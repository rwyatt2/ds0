'use client';

import { Home, BarChart3, Settings, Users, Bell, Search } from 'lucide-react';

export function DashboardLayoutPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl">
            <div className="rounded-lg border bg-white overflow-hidden dark:bg-gray-900 dark:border-gray-800">
                <div className="flex h-[280px]">
                    {/* Sidebar */}
                    <div className="w-48 border-r bg-gray-50 p-2 hidden sm:block dark:bg-gray-950 dark:border-gray-800">
                        <div className="flex items-center gap-2 px-2 py-2 mb-2">
                            <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">D</div>
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">DS0 App</span>
                        </div>
                        {[
                            { icon: Home, label: 'Dashboard', active: true },
                            { icon: BarChart3, label: 'Analytics', active: false },
                            { icon: Users, label: 'Team', active: false },
                            { icon: Settings, label: 'Settings', active: false },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${item.active ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                    <Icon className="h-3.5 w-3.5" /> {item.label}
                                </div>
                            );
                        })}
                    </div>
                    {/* Main */}
                    <div className="flex-1 flex flex-col">
                        {/* Top bar */}
                        <div className="flex items-center justify-between border-b px-4 h-10 dark:border-gray-800">
                            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Dashboard</span>
                            <div className="flex items-center gap-2">
                                <Search className="h-3.5 w-3.5 text-gray-400" />
                                <Bell className="h-3.5 w-3.5 text-gray-400" />
                                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-medium">JD</div>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="flex-1 p-4">
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {['$45k', '2.3k', '1.2k', '3.2%'].map((val, i) => (
                                    <div key={i} className="rounded border p-2 dark:border-gray-800">
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{['Revenue', 'Users', 'Orders', 'CVR'][i]}</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="rounded border p-2 h-24 flex items-center justify-center dark:border-gray-800">
                                <span className="text-xs text-gray-400 dark:text-gray-500">Chart Area</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
