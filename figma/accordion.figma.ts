import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/[FILE_ID]/Accordion', {
    props: {
        type: figma.enum('Type', { Single: 'single', Multiple: 'multiple' }),
    },
    example: ({ type }) => (
        <Accordion type= { type } defaultValue="item-1" >
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Section 1</ Accordion.Trigger >
    <Accordion.Content>Content 1 </Accordion.Content>
    </Accordion.Item>
</Accordion>
),
});
