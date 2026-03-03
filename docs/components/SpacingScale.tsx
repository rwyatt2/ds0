import resolvedTokens from '../../packages/tokens/json/resolved.json';

export function SpacingScale(): React.ReactElement {
    // Token keys are PascalCase (e.g., Spacing1, Spacing2)
    const spacingTokens = Object.entries(resolvedTokens)
        .filter(
            ([key, value]) => key.startsWith('Spacing') && typeof value === 'string',
        )
        .map(([key, value]) => ({
            name: key.replace('Spacing', ''),
            value: value as string,
        }))
        .sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

    return (
        <div className="my-6 space-y-3">
            {spacingTokens.map((token) => (
                <div key={token.name} className="flex items-center gap-4">
                    <span className="w-12 text-right font-mono text-xs text-fd-muted-foreground">
                        {token.name}
                    </span>
                    <div
                        className="h-4 rounded bg-fd-primary"
                        style={{ width: token.value }}
                    />
                    <span className="font-mono text-xs text-fd-muted-foreground">
                        {token.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
