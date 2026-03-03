'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginFormPreview(): React.ReactElement {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-sm">
            <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800">
                <div className="p-6 pb-4 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Welcome back</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to your account</p>
                </div>
                <div className="px-6 pb-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Password</label>
                            <a href="#" className="text-xs text-blue-600 hover:underline dark:text-blue-400" onClick={(e) => e.preventDefault()}>Forgot?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 dark:border-gray-600">
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                    <button type="button" className="h-10 w-full rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                        Sign In
                    </button>
                    <div className="flex items-center gap-3">
                        <hr className="flex-1 border-gray-200 dark:border-gray-700" />
                        <span className="text-xs text-gray-400">OR</span>
                        <hr className="flex-1 border-gray-200 dark:border-gray-700" />
                    </div>
                    <button type="button" className="h-10 w-full rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        Continue with Google
                    </button>
                </div>
                <div className="border-t px-6 py-4 text-center dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account?{' '}
                        <a href="#" className="text-blue-600 hover:underline dark:text-blue-400" onClick={(e) => e.preventDefault()}>Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
