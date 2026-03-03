'use client';

import { Mail, Lock, User } from 'lucide-react';

export function SignupFormPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800">
                <div className="p-6 pb-4 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get started for free</p>
                </div>
                <div className="px-6 pb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input type="text" placeholder="Jane" className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Last Name</label>
                            <input type="text" placeholder="Cooper" className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input type="email" placeholder="you@example.com" className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input type="password" placeholder="••••••••" className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                        </div>
                    </div>
                    <label className="flex items-start gap-2 cursor-pointer">
                        <div className="flex h-4 w-4 mt-0.5 items-center justify-center rounded border-2 border-gray-300 dark:border-gray-600 shrink-0" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                    <button type="button" className="h-10 w-full rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors">Create Account</button>
                </div>
                <div className="border-t px-6 py-4 text-center dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Already have an account? <a href="#" className="text-blue-600 hover:underline dark:text-blue-400" onClick={(e) => e.preventDefault()}>Sign in</a></p>
                </div>
            </div>
        </div>
    );
}
