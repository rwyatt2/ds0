import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/FIGMA_FILE_ID/Switch', {
    props: {
        size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
        label: figma.string('Label'),
        isChecked: figma.boolean('Checked'),
        isDisabled: figma.boolean('Disabled'),
    },
    example: ({ size, label, isChecked, isDisabled }) => (
        <Switch label= { label } size={ size } defaultChecked={ isChecked } isDisabled={ isDisabled } />
    ),
});
