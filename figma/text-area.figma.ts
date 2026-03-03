import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/FIGMA_FILE_ID/TextArea', {
    props: {
        size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
        label: figma.string('Label'),
        placeholder: figma.string('Placeholder'),
        isDisabled: figma.boolean('Disabled'),
        isRequired: figma.boolean('Required'),
    },
    example: ({ size, label, placeholder, isDisabled, isRequired }) => (
        <TextArea label= { label } size={ size } placeholder={ placeholder } isDisabled={ isDisabled } isRequired={ isRequired } />
    ),
});
