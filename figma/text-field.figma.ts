import figma from '@figma/code-connect';

/**
 * Maps the Figma TextField component to the DS0 React implementation.
 * When a developer inspects this component in Figma, they see real DS0 code.
 *
 * Figma component name: Data Input/TextField
 */
figma.connect('https://figma.com/file/FIGMA_FILE_ID/TextField', {
    props: {
        size: figma.enum('Size', {
            Small: 'sm',
            Medium: 'md',
            Large: 'lg',
        }),
        label: figma.string('Label'),
        placeholder: figma.string('Placeholder'),
        type: figma.enum('Type', {
            Text: 'text',
            Email: 'email',
            Password: 'password',
            Search: 'search',
        }),
        isDisabled: figma.boolean('Disabled'),
        isRequired: figma.boolean('Required'),
        isInvalid: figma.boolean('Invalid'),
        hasLeftIcon: figma.boolean('Has Left Icon'),
        hasRightIcon: figma.boolean('Has Right Icon'),
    },
    example: ({ size, label, placeholder, type, isDisabled, isRequired, isInvalid }) => (
        <TextField
            label= { label }
            type={ type }
            size={ size }
            placeholder={ placeholder }
            isDisabled={ isDisabled }
            isRequired={ isRequired }
            isInvalid={ isInvalid }
    />
    ),
});
