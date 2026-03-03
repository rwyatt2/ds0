import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/PLACEHOLDER/Pagination', {
    props: {
        totalPages: figma.number('Total Pages'),
        currentPage: figma.number('Current Page'),
        size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
    },
    example: ({ totalPages, currentPage, size }) =>
        `<Pagination totalPages={${totalPages}} currentPage={${currentPage}} onPageChange={setPage} size="${size}" />`,
});
