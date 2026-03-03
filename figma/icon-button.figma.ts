import figma from '@figma/code-connect';
figma.connect('https://figma.com/file/FIGMA_FILE_ID/IconButton', {
    props: {
        variant: figma.enum('Variant', { Primary: 'primary', Ghost: 'ghost', Outline: 'outline' }),
        size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
    },
    example: ({ variant, size }) => <IconButton icon={<Icon />} aria-label="Action" variant={variant} size={size} />,
});
