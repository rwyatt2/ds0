import figma from '@figma/code-connect';

/**
 * Maps the Figma RadioGroup component to the DS0 React implementation.
 */
figma.connect('https://figma.com/file/FILE_ID/RadioGroup', {
    props: {
        orientation: figma.enum('Orientation', {
            Vertical: 'vertical',
            Horizontal: 'horizontal',
        }),
        disabled: figma.boolean('Disabled'),
        label: figma.string('Label'),
    },
    example: (props) => (
        <RadioGroup
            label= { props.label }
            orientation={ props.orientation }
            isDisabled={ props.disabled }
    >
    <RadioGroup.Item value="option-1" label = "Option 1" />
        <RadioGroup.Item value="option-2" label = "Option 2" />
            </RadioGroup>
    ),
});
