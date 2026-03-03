export function TypographyScale(): React.ReactElement {
    const sizes = [
        { name: 'xs', value: '12px', lineHeight: '16px' },
        { name: 'sm', value: '14px', lineHeight: '20px' },
        { name: 'base', value: '16px', lineHeight: '24px' },
        { name: 'lg', value: '18px', lineHeight: '28px' },
        { name: 'xl', value: '20px', lineHeight: '28px' },
        { name: '2xl', value: '24px', lineHeight: '32px' },
        { name: '3xl', value: '30px', lineHeight: '40px' },
        { name: '4xl', value: '36px', lineHeight: '44px' },
        { name: '5xl', value: '48px', lineHeight: '60px' },
        { name: '6xl', value: '60px', lineHeight: '72px' },
    ];

    return (
        <div className="my-6 space-y-8">
            {sizes.map((size) => (
                <div key={size.name} className="flex items-baseline gap-4">
                    <span className="w-16 shrink-0 text-right font-mono text-xs text-fd-muted-foreground">
                        {size.name}
                    </span>
                    <span style={{ fontSize: size.value, lineHeight: size.lineHeight }}>
                        The quick brown fox jumps over the lazy dog
                    </span>
                    <span className="shrink-0 font-mono text-xs text-fd-muted-foreground">
                        {size.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
