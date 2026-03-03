'use client';

import { Mail } from 'lucide-react';

export function ForgotPasswordPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800">
                <div className="p-6 pb-4 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Reset password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We&apos;ll send you a reset link</p>
                </div>
                <div className="px-6 pb-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input type="email" placeholder="you@example.com" className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                        </div>
                    </div>
                    <button type="button" className="h-10 w-full rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors">Send Reset Link</button>
                </div>
                <div className="border-t px-6 py-4 text-center dark:border-gray-800">
                    <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400" onClick={(e) => e.preventDefault()}>← Back to sign in</a>
                </div>
            </div>
        </div>
    );
}
