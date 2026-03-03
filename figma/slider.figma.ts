import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/FIGMA_FILE_ID/Slider', {
    props: { size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }), label: figma.string('Label'), isDisabled: figma.boolean('Disabled') },
    example: ({ size, label, isDisabled }) => (<Slider label= { label } size={ size } isDisabled={ isDisabled } />),
});
