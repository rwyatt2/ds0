import resolvedTokens from '../../packages/tokens/json/resolved.json';

function ColorSwatch({
    name,
    value,
}: {
    name: string;
    value: string;
}): React.ReactElement {
    return (
        <div className="flex flex-col">
            <div
                className="h-16 w-full rounded-md border"
                style={{ backgroundColor: value }}
            />
            <div className="mt-2">
                <p className="text-xs font-medium">{name}</p>
                <p className="text-xs text-fd-muted-foreground">{value}</p>
            </div>
        </div>
    );
}

interface ColorPaletteProps {
    colorName: string;
}

export function ColorPalette({
    colorName,
}: ColorPaletteProps): React.ReactElement {
    // Token keys are PascalCase (e.g., ColorBlue500) — filter by matching prefix
    const prefix = `Color${colorName.charAt(0).toUpperCase()}${colorName.slice(1)}`;
    const colorTokens = Object.entries(resolvedTokens)
        .filter(
            ([key]) =>
                key.startsWith(prefix) && typeof resolvedTokens[key as keyof typeof resolvedTokens] === 'string',
        )
        .map(([key, value]) => ({
            name: key.replace('Color', ''),
            value: value as string,
        }));

    if (colorTokens.length === 0) {
        return (
            <p className="my-6 text-sm text-fd-muted-foreground">
                No color tokens found for &quot;{colorName}&quot;.
            </p>
        );
    }

    return (
        <div className="my-6 grid grid-cols-5 gap-4 sm:grid-cols-11">
            {colorTokens.map((token) => (
                <ColorSwatch key={token.name} name={token.name} value={token.value} />
            ))}
        </div>
    );
}
