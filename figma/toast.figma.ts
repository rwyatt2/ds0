import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/PLACEHOLDER/Toast', {
    props: {
        variant: figma.enum('Variant', {
            Default: 'default',
            Success: 'success',
            Warning: 'warning',
            Destructive: 'destructive',
        }),
    },
    example: ({ variant }) =>
        `toast({ title: "Notification", variant: "${variant}" })`,
});
