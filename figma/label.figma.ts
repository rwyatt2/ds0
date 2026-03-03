import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/FIGMA_FILE_ID/Label', {
    props: {
        children: figma.string('Text'),
        required: figma.boolean('Required'),
        size: figma.enum('Size', { Small: 'sm', Medium: 'md' }),
    },
    example: ({ children, required, size }) => (
        <Label htmlFor= "input" required={ required } size={ size } > { children } </Label>
    ),
});
