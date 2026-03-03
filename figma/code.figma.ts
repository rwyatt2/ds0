import figma from '@figma/code-connect';
figma.connect('https://figma.com/file/FIGMA_FILE_ID/Code', {
    props: {
        variant: figma.enum('Variant', { Inline: 'inline', Block: 'block' }),
        children: figma.string('Content'),
    },
    example: ({ variant, children }) => <Code variant={ variant } > { children } </Code>,
});
