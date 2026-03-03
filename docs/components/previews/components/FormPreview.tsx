'use client';

export function FormPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        defaultValue="Jane Cooper"
                        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        defaultValue="bad-email"
                        className="h-10 w-full rounded-md border border-red-500 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:bg-gray-900 dark:text-gray-100"
                    />
                    <p className="text-xs text-red-500">Please enter a valid email address.</p>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Bio</label>
                    <textarea
                        rows={3}
                        placeholder="Tell us about yourself..."
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
                    />
                </div>
                <button
                    type="submit"
                    className="h-10 w-full rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
