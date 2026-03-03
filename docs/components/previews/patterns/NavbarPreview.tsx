'use client';

import { Search, Bell, Menu } from 'lucide-react';

const links = ['Dashboard', 'Projects', 'Team', 'Reports'];

export function NavbarPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl">
            <div className="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="flex items-center justify-between px-4 h-14">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">D</div>
                            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">DS0</span>
                        </div>
                        <nav className="hidden sm:flex items-center gap-1">
                            {links.map((link, i) => (
                                <a
                                    key={link}
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${i === 0
                                            ? 'text-blue-600 bg-blue-50 font-medium dark:text-blue-400 dark:bg-blue-900/20'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {link}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                            <Search className="h-4 w-4" />
                        </button>
                        <button type="button" className="p-2 text-gray-500 hover:text-gray-900 relative dark:text-gray-400 dark:hover:text-gray-100">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600" />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium ml-1">JD</div>
                        <button type="button" className="sm:hidden p-2 text-gray-500">
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
