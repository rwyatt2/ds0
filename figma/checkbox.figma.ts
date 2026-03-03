import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/FIGMA_FILE_ID/Checkbox', {
    props: {
        size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
        label: figma.string('Label'),
        isDisabled: figma.boolean('Disabled'),
        isChecked: figma.boolean('Checked'),
        isIndeterminate: figma.boolean('Indeterminate'),
    },
    example: ({ size, label, isDisabled, isChecked, isIndeterminate }) => (
        <Checkbox label= { label } size={ size } isDisabled={ isDisabled } defaultChecked={ isChecked } indeterminate={ isIndeterminate } />
    ),
});
