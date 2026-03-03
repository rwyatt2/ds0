'use client';

export function CodePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-4">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Inline Code</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Install with{' '}
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-pink-600 dark:bg-gray-800 dark:text-pink-400">
                        npm install @ds0/tokens
                    </code>{' '}
                    to get started.
                </p>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Code Block</p>
                <div className="rounded-lg bg-gray-950 p-4 font-mono text-sm text-gray-100 overflow-x-auto">
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">Button</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@ds0/react&apos;</span>;</div>
                    <div className="mt-1"><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">tokens</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@ds0/tokens&apos;</span>;</div>
                </div>
            </div>
        </div>
    );
}
