import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/[FILE_ID]/ToggleGroup', {
    props: {
        variant: figma.enum('Variant', { Default: 'default', Outline: 'outline' }),
        size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
    },
    example: ({ variant, size }) => (
        <ToggleGroup type= "single" variant={ variant } size={ size } defaultValue="a" >
        <ToggleGroup.Item value="a"> A </ToggleGroup.Item>
            < ToggleGroup.Item value="b" > B </ToggleGroup.Item>
            </ToggleGroup>
    ),
});
