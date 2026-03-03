import figma from '@figma/code-connect';
figma.connect('https://figma.com/file/FIGMA_FILE_ID/Link', {
    props: { variant: figma.enum('Variant', { Default: 'default', Muted: 'muted', Underline: 'underline' }), label: figma.string('Label'), isExternal: figma.boolean('External') },
    example: ({ variant, label, isExternal }) => (<Link href= "#" variant={ variant } isExternal={ isExternal } > { label } </Link>),
});
