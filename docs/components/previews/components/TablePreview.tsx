'use client';

export function TablePreview(): React.ReactElement {
    const data = [
        { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
        { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
        { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    ];

    return (
        <div className="w-full max-w-xl overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100">Name</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100">Email</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100">Role</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.name} className="border-b border-gray-100 dark:border-gray-800">
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{row.name}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.email}</td>
                            <td className="px-4 py-3">
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                    {row.role}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${row.status === 'Active'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                    }`}>
                                    {row.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
