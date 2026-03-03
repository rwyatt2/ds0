import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/FIGMA_FILE_ID/Text', {
    props: {
        size: figma.enum('Size', { XS: 'xs', SM: 'sm', Base: 'base', LG: 'lg', XL: 'xl' }),
        weight: figma.enum('Weight', { Regular: 'regular', Medium: 'medium', Semibold: 'semibold', Bold: 'bold' }),
        color: figma.enum('Color', { Default: 'default', Muted: 'muted', Primary: 'primary' }),
        children: figma.string('Text'),
    },
    example: ({ size, weight, color, children }) => (
        <Text size= { size } weight={ weight } color={ color } > { children } </Text>
    ),
});
