import figma from '@figma/code-connect';

/**
 * Maps the Figma Button component to the DS0 React implementation.
 * When a developer inspects this component in Figma, they see real DS0 code.
 *
 * Figma component name: Actions/Button
 */
figma.connect('https://figma.com/file/FIGMA_FILE_ID/Button', {
    props: {
        variant: figma.enum('Variant', {
            Primary: 'primary',
            Secondary: 'secondary',
            Destructive: 'destructive',
            Ghost: 'ghost',
            Outline: 'outline',
        }),
        size: figma.enum('Size', {
            Small: 'sm',
            Medium: 'md',
            Large: 'lg',
        }),
        children: figma.string('Label'),
        hasLeftIcon: figma.boolean('Has Left Icon'),
        hasRightIcon: figma.boolean('Has Right Icon'),
        isDisabled: figma.boolean('Disabled'),
        isLoading: figma.boolean('Loading'),
    },
    example: ({ variant, size, children, isDisabled, isLoading }) => (
        <Button
      variant= { variant }
      size={ size }
      isDisabled={ isDisabled }
      isLoading={ isLoading }
    >
    { children }
    </Button>
  ),
});
