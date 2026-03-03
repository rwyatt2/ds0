interface PropDef {
    name: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
}

interface PropsTableProps {
    props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps): React.ReactElement {
    return (
        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-3 text-left font-medium">Prop</th>
                        <th className="px-4 py-3 text-left font-medium">Type</th>
                        <th className="px-4 py-3 text-left font-medium">Default</th>
                        <th className="px-4 py-3 text-left font-medium">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((prop) => (
                        <tr key={prop.name} className="border-b">
                            <td className="px-4 py-3 font-mono text-xs">
                                {prop.name}
                                {prop.required && (
                                    <span className="ml-1 text-red-500">*</span>
                                )}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-fd-muted-foreground">
                                {prop.type}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-fd-muted-foreground">
                                {prop.default ?? '—'}
                            </td>
                            <td className="px-4 py-3 text-fd-muted-foreground">
                                {prop.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
