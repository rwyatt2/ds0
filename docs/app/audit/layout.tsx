export default function AuditLayout({ children }: { children: React.ReactNode }): React.ReactElement {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {children}
        </div>
    );
}
