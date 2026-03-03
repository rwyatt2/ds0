import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/[FILE_ID]/Card', {
    props: {
        variant: figma.enum('Variant', {
            Default: 'default',
            Outline: 'outline',
            Ghost: 'ghost',
            Elevated: 'elevated',
        }),
    },
    example: ({ variant }) => (
        <Card variant= { variant } >
        <Card.Header>
        <Card.Title>Title </Card.Title>
        </Card.Header>
        < Card.Content > Content </Card.Content>
        </Card>
    ),
});
