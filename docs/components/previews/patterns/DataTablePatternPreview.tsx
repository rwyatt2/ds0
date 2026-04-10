'use client';

import React from 'react';

export function DataTablePatternPreview(): React.ReactElement {
    const rows = [
        { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
        { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
        { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    ];

    return (
        <div className="w-full max-w-2xl rounded-lg border bg-card overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
                <input type="text" placeholder="Search users..." className="bg-muted/50 px-3 py-1.5 rounded-md text-sm outline-none w-48" />
                <span className="text-xs text-muted-foreground">3 results</span>
            </div>
            <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-2 font-medium">Name</th>
                    <th className="text-left px-4 py-2 font-medium">Email</th>
                    <th className="text-left px-4 py-2 font-medium">Role</th>
                    <th className="text-left px-4 py-2 font-medium">Status</th>
                </tr></thead>
                <tbody>{rows.map((r, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-accent/30">
                        <td className="px-4 py-2.5 font-medium">{r.name}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{r.email}</td>
                        <td className="px-4 py-2.5">{r.role}</td>
                        <td className="px-4 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'Active' ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-500'}`}>{r.status}</span></td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
