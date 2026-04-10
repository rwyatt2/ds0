'use client';

import React from 'react';

export function FormsPatternPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <form className="space-y-4 rounded-lg border bg-card p-5" onSubmit={e => e.preventDefault()}>
                <div><label className="text-sm font-medium block mb-1.5">Full Name</label><input type="text" placeholder="John Doe" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" /></div>
                <div><label className="text-sm font-medium block mb-1.5">Email</label><input type="email" placeholder="john@example.com" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" /></div>
                <div><label className="text-sm font-medium block mb-1.5">Message</label><textarea placeholder="Your message..." rows={3} className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" /></div>
                <button type="submit" className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:bg-primary/90 transition-colors">Submit</button>
            </form>
        </div>
    );
}
