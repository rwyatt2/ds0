import figma from '@figma/code-connect';
figma.connect('https://figma.com/file/FIGMA_FILE_ID/Badge', {
    props: { variant: figma.enum('Variant', { Default: 'default', Success: 'success', Destructive: 'destructive' }), children: figma.string('Text') },
    example: ({ variant, children }) => <Badge variant={variant}>{children}</Badge>,
});
