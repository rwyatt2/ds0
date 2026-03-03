import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/PLACEHOLDER/Progress', {
    props: {
        variant: figma.enum('Variant', {
            Default: 'default',
            Success: 'success',
            Warning: 'warning',
            Destructive: 'destructive',
        }),
        size: figma.enum('Size', {
            Small: 'sm',
            Medium: 'md',
            Large: 'lg',
        }),
        value: figma.number('Value'),
        indeterminate: figma.boolean('Indeterminate'),
    },
    example: ({ variant, size, value, indeterminate }) =>
        `<Progress variant="${variant}" size="${size}" value={${value}} ${indeterminate ? 'indeterminate' : ''} />`,
});
