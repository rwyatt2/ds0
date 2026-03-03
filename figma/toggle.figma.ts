import figma from '@figma/code-connect';

/**
 * Maps the Figma Toggle component to the DS0 React implementation.
 */
figma.connect('https://figma.com/file/PLACEHOLDER/Toggle', {
    props: {
        variant: figma.enum('Variant', {
            Default: 'default',
            Outline: 'outline',
        }),
        size: figma.enum('Size', {
            Small: 'sm',
            Medium: 'md',
            Large: 'lg',
        }),
        pressed: figma.boolean('Pressed'),
        disabled: figma.boolean('Disabled'),
    },
    example: ({ variant, size, pressed, disabled }) => (
        <Toggle variant= { variant } size={ size } defaultPressed={ pressed } isDisabled={ disabled } >
        Bold
        </Toggle>
    ),
});
