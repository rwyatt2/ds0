import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/[FILE_ID]/Alert', {
    props: {
        variant: figma.enum('Variant', {
            Default: 'default',
            Info: 'info',
            Success: 'success',
            Warning: 'warning',
            Destructive: 'destructive',
        }),
    },
    example: ({ variant }) => (
        <Alert variant= { variant } >
        <Alert.Title>Alert Title</ Alert.Title >
    <Alert.Description>Alert description.</Alert.Description>
</Alert>
),
});
