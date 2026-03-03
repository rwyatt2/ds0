import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = source.getPages().map((p) => ({
        url: `https://ds0.systems/docs/${p.slugs.join('/')}`,
        lastModified: new Date(),
    }));

    return [
        { url: 'https://ds0.systems', lastModified: new Date() },
        ...pages,
    ];
}
