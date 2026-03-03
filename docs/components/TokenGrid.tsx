import resolvedTokens from '../../packages/tokens/json/resolved.json';

interface TokenGridProps {
    category?: string;
}

export function TokenGrid({
    category = 'Color',
}: TokenGridProps): React.ReactElement {
    const tokens = Object.entries(resolvedTokens)
        .filter(
            ([key, value]) =>
                key.startsWith(category) && typeof value === 'string',
        )
        .map(([key, value]) => ({
            name: key,
            value: value as string,
        }));

    if (tokens.length === 0) {
        return (
            <p className="my-6 text-sm text-fd-muted-foreground">
                No tokens found for category &quot;{category}&quot;.
            </p>
        );
    }

    return (
        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-3 text-left font-medium">Token</th>
                        <th className="px-4 py-3 text-left font-medium">Value</th>
                        {category === 'Color' && (
                            <th className="px-4 py-3 text-left font-medium">Preview</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {tokens.map((token) => (
                        <tr key={token.name} className="border-b">
                            <td className="px-4 py-3 font-mono text-xs">{token.name}</td>
                            <td className="px-4 py-3 font-mono text-xs text-fd-muted-foreground">
                                {token.value}
                            </td>
                            {category === 'Color' && (
                                <td className="px-4 py-3">
                                    <div
                                        className="h-6 w-12 rounded border"
                                        style={{ backgroundColor: token.value }}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
