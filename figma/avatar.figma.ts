import figma from '@figma/code-connect';
figma.connect('https://figma.com/file/FIGMA_FILE_ID/Avatar', {
    props: { size: figma.enum('Size', { XSmall: 'xs', Small: 'sm', Medium: 'md', Large: 'lg', XLarge: 'xl' }), shape: figma.enum('Shape', { Circle: 'circle', Square: 'square' }) },
    example: ({ size, shape }) => (<Avatar alt= "User" fallback="U" size={ size } shape={ shape } />),
});
