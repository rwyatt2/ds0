import Link from 'next/link';

interface ComponentCardProps {
    name: string;
    description: string;
    category: string;
    href: string;
}

export function ComponentCard({
    name,
    description,
    category,
    href,
}: ComponentCardProps): React.ReactElement {
    return (
        <Link
            href={href}
            className="group rounded-lg border p-4 transition-colors hover:border-fd-primary hover:bg-fd-accent/50"
        >
            <div className="mb-1 text-xs font-medium text-fd-muted-foreground">
                {category}
            </div>
            <h3 className="mb-1 font-semibold group-hover:text-fd-primary">{name}</h3>
            <p className="text-sm text-fd-muted-foreground">{description}</p>
        </Link>
    );
}
