import { forwardRef } from 'react';
import type { ChangelogProps } from './Changelog.types';
import { useChangelog } from './useChangelog';
const ChangelogPrimitive = forwardRef<HTMLDivElement, ChangelogProps>(({ entries, title, ...rest }, ref) => {
    const { changelogProps } = useChangelog();
    return (<div ref={ref} {...rest} {...changelogProps}>{title && <h2>{title}</h2>}{entries.map(e => <article key={e.id}><h3>{e.version} — {e.title}</h3><time>{e.date}</time>{e.description && <p>{e.description}</p>}</article>)}</div>);
});
ChangelogPrimitive.displayName = 'ChangelogPrimitive';
export { ChangelogPrimitive };
