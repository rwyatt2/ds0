interface KeyboardInteraction {
    key: string;
    action: string;
}

interface KeyboardTableProps {
    interactions: KeyboardInteraction[];
}

export function KeyboardTable({
    interactions,
}: KeyboardTableProps): React.ReactElement {
    return (
        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-3 text-left font-medium">Key</th>
                        <th className="px-4 py-3 text-left font-medium">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {interactions.map((interaction) => (
                        <tr key={interaction.key} className="border-b">
                            <td className="px-4 py-3">
                                <kbd className="rounded border bg-fd-muted px-2 py-0.5 font-mono text-xs">
                                    {interaction.key}
                                </kbd>
                            </td>
                            <td className="px-4 py-3 text-fd-muted-foreground">
                                {interaction.action}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
