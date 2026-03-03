import figma from '@figma/code-connect';

/**
 * Maps the Figma Heading component to the DS0 React implementation.
 * When a developer inspects this component in Figma, they see real DS0 code.
 *
 * Figma component name: Typography/Heading
 */
figma.connect('https://figma.com/file/FIGMA_FILE_ID/Heading', {
    props: {
        level: figma.enum('Level', {
            H1: 'h1',
            H2: 'h2',
            H3: 'h3',
            H4: 'h4',
            H5: 'h5',
            H6: 'h6',
        }),
        size: figma.enum('Size', {
            XS: 'xs',
            SM: 'sm',
            MD: 'md',
            LG: 'lg',
            XL: 'xl',
            '2XL': '2xl',
            '3XL': '3xl',
            '4XL': '4xl',
        }),
        children: figma.string('Text'),
    },
    example: ({ level, size, children }) => (
        <Heading as= { level } size={ size } >
        { children }
        </Heading>
    ),
});
